//tarea 1 - creacion de dataset con fotografias de objetos cotidianos
//tarea 2 - Generacion de modelos fotogrametricos en metashape o recap 

//Tarea 3 - cargando modelos de fotogrametria dentro de nuestra web 


//Importamos las librerias necesarias 
import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js'; //importamos TODO con el alias THREE desde URL
//importamos Orbitcontrols (control de camara) desde la web, utilizando...
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.120.1/examples/jsm/controls/OrbitControls.js'; // Imports solo orbitcontrols desde URL
import { DDSLoader } from 'https://cdn.skypack.dev/three@0.120.1/examples/jsm/loaders/DDSLoader.js';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.120.1/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.120.1/examples/jsm/loaders/OBJLoader.js';

//declaramos variables globales 
let camera, scene, renderer;
let controls;

init();
animate();

function init(){
    //declarar nuestro vector Z
    THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

    //crear nuestro renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.body.appendChild( renderer.domElement );

    //creamos nuestra camara
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z=600;

    //creamos nuestra escena 
    scene =  new THREE.Scene();

    scene.background = new THREE.Color( 0x404040 );

    //creamos neustras luces 
    const directionalLight = new THREE.DirectionalLight( 0x404040, 2 );
    directionalLight.position.set( 0, 0, 2 );
    const light = new THREE.AmbientLight( 0x404040 ); // soft white light

    //añadimos nuestra luz a la escena 
    scene.add(directionalLight);
    scene.add( light );

    //creamos nuestro cargador de archivos OBJ
    // model

    const onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
        }
    };

    const onError = function () { };

    const manager = new THREE.LoadingManager();
    manager.addHandler( /\.dds$/i, new DDSLoader() );

    new MTLLoader( manager )
        .setPath( './obj_model/caja/' ) // ruta a la carpeta que contiene el archivo obj, el archivo mtl y el archivo png o jpg de textura
        .load( 'caja.mtl', function ( materials ) {

            materials.preload();

            new OBJLoader( manager )
                .setMaterials( materials )
                .setPath( './obj_model/caja/' ) // ruta a la carpeta que contiene el archivo obj, el archivo mtl y el archivo png o jpg de textura
                .load( 'caja.obj', function ( object ) { // ruta a la carpeta que contiene el archivo obj

                    object.position.y = - 95;
                    scene.add( object );

                }, onProgress, onError );
        } );


    controls = new OrbitControls( camera, renderer.domElement );

    window.addEventListener( 'resize', resize );
}


//function resize 
function resize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );

}

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {

   
    renderer.render( scene, camera );

}



