//declaramos las variables 

let scene, camera, renderer, clock , deltaTime, totalTime;

let arToolkitSource, arToolkitContext; 

let mesh1;

let raycaster; //permite apuntar o detectar objetos en nuestra aplicacion  

let mouse = new THREE.Vector2();

let INTERSECTED; //guarda info sobre los objetos intersectados por mi raycast

let objects = []; //guarda los objetos que quiero detectar

let marker1;
let marker2;
let marker3;
let marker4;
let marker5;
let marker6;
let marker7;
let marker8;
let marker9;

let video1;

init();
animate();

function init(){
    
    //ESCENA
    scene =  new THREE.Scene();


    //LUCES
    let light = new THREE.PointLight(0xf000000, 1, 1000);
    light.position.set(0,4,4);
    light.castShadow =  true;
    scene.add(light);

    let lightSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        })
    );

    lightSphere.position.copy(light);
    scene.add(lightSphere);


    //creamos luces 
    let ambientLight = new THREE.AmbientLight(0xcccccc); //creo las luz
    scene.add(ambientLight); //agrego la luz a mi escena. 


    camera =  new THREE.Camera();
    scene.add(camera);

    
    //RENDERER
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setClearColor(new THREE.Color('lightgrey'), 0);
    renderer.setSize(1920, 1080);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    document.body.appendChild(renderer.domElement); // agregarlo a nuestra pagina web

    //TIME
    clock = new THREE.Clock();
    deltaTime = 0;
    totalTime = 0;

	//raycaster
	raycaster = new THREE.Raycaster();

    //AR Setup
    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize() {
        arToolkitSource.onResizeElement()
        arToolkitSource.copyElementSizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
        }
    }


    arToolkitSource.init(function onReady() {
        onResize();
    });

    //agregamos un event listener
    window.addEventListener('resize', function () { onResize() });


    //Setup ArKitContext
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'data/camera_para.dat',
        detectionMode: 'mono'
    });

    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    //MARKERS
    marker1 =  new THREE.Group();
    scene.add(marker1);
    let markerControl = new THREEx.ArMarkerControls(arToolkitContext, marker1, {

        type: 'pattern', patternUrl: 'data/mark01.patt',
    });

    marker2 =  new THREE.Group();
    scene.add(marker2);
    let markerControl2 = new THREEx.ArMarkerControls(arToolkitContext, marker2, {

        type: 'pattern', patternUrl: 'data/mark02.patt',
    });

    marker3 =  new THREE.Group();
    scene.add(marker3);
    let markerControl3 = new THREEx.ArMarkerControls(arToolkitContext, marker3, {

        type: 'pattern', patternUrl: 'data/mark03.patt',
    });

    marker4 =  new THREE.Group();
    scene.add(marker4);
    let markerControl4 = new THREEx.ArMarkerControls(arToolkitContext, marker4, {

        type: 'pattern', patternUrl: 'data/mark04.patt',
    });

    marker5 =  new THREE.Group();
    scene.add(marker5);
    let markerControl5 = new THREEx.ArMarkerControls(arToolkitContext, marker5, {

        type: 'pattern', patternUrl: 'data/mark05.patt',
    });

    marker6 =  new THREE.Group();
    scene.add(marker6);
    let markerControl6 = new THREEx.ArMarkerControls(arToolkitContext, marker6, {

        type: 'pattern', patternUrl: 'data/mark06.patt',
    });

    marker7 =  new THREE.Group();
    scene.add(marker7);
    let markerControl7 = new THREEx.ArMarkerControls(arToolkitContext, marker7, {

        type: 'pattern', patternUrl: 'data/mark07.patt',
    });

    marker8 =  new THREE.Group();
    scene.add(marker8);
    let markerControl8 = new THREEx.ArMarkerControls(arToolkitContext, marker8, {

        type: 'pattern', patternUrl: 'data/mark08.patt',
    });

    marker9 =  new THREE.Group();
    scene.add(marker9);
    let markerControl9 = new THREEx.ArMarkerControls(arToolkitContext, marker9, {

        type: 'pattern', patternUrl: 'data/mark09.patt',
    });
        

    //////OBJETOS RHINO ///////////////
   
    /////// OBJ IMPORT/////////////////////
    function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) { console.log("ha ocurrido un error") };
    
    //Edificio 1
    new THREE.MTLLoader()
    .setPath('data/')
    .load('edi01.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/')
            .load('edi01.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(1,1,1);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;
   
                marker1.add(RhinoMesh);
            }, onProgress, onError);
    });
    
    //Edificio 2
    new THREE.MTLLoader()
    .setPath('data/')
    .load('edi02.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/')
            .load('edi02.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(1,1,1);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;

                marker2.add(RhinoMesh);
            }, onProgress, onError);
    });

    //Edificio 3
    new THREE.MTLLoader()
    .setPath('data/')
    .load('edi03.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/')
            .load('edi03.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(1,1,1);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;

                marker3.add(RhinoMesh);
            }, onProgress, onError);
    });

    //Edificio 4
    new THREE.MTLLoader()
    .setPath('data/')
    .load('edi04.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/')
            .load('edi04.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(1,1,1);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;

                marker4.add(RhinoMesh);
            }, onProgress, onError);
    });

    //Edificio 5
    new THREE.MTLLoader()
    .setPath('data/')
    .load('edi05.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/')
            .load('edi05.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(1,1,1);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;

                marker5.add(RhinoMesh);
            }, onProgress, onError);
    });

        //Edificio 6
        new THREE.MTLLoader()
        .setPath('data/')
        .load('edi06.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('data/')
                .load('edi06.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(1,1,1);
                    RhinoMesh.castShadow = true;
                    RhinoMesh.receiveShadow = false;

                    marker6.add(RhinoMesh);
                }, onProgress, onError);
        });

            //Edificio 7
    new THREE.MTLLoader()
    .setPath('data/')
    .load('edi07.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/')
            .load('edi07.obj', function (group) {
                RhinoMesh = group.children[0];
                RhinoMesh.material.side = THREE.DoubleSide;
                RhinoMesh.scale.set(1,1,1);
                RhinoMesh.castShadow = true;
                RhinoMesh.receiveShadow = false;

                marker7.add(RhinoMesh);
            }, onProgress, onError);
    });

        //Edificio 8
        new THREE.MTLLoader()
        .setPath('data/')
        .load('edi08.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('data/')
                .load('edi08.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(1,1,1);
                    RhinoMesh.castShadow = true;
                    RhinoMesh.receiveShadow = false;

                    marker8.add(RhinoMesh);
                }, onProgress, onError);
        });


	/// VIDEO

	let geometry1 =  new THREE.PlaneGeometry(3,2);

	video1 =  document.getElementById('video1');
	let texture =  new THREE.VideoTexture(video1);
	texture.minFilter =  THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.format =  THREE.RGBFormat;

	
	let material1 =  new THREE.MeshBasicMaterial({map: texture});
	mesh1 =  new THREE.Mesh(geometry1, material1);
	mesh1.name= "video";
	mesh1.rotation.x =  -Math.PI/2;
	marker9.add(mesh1);
	objects.push(mesh1);

    //////////EVENT LISTERNERS/////////////////////////////////
    document.addEventListener('mousemove', onDocumentMouseMove, false);// detecta movimiento del mouse

}    

//////////////FUNCIONES//////////////////////////////////

function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1); //mouse pos
    raycaster.setFromCamera(mouse, camera); //creo el rayo que va desde la camara , pasa por el frustrum 
    let intersects = raycaster.intersectObjects(objects, true); //buscamos las intersecciones

    if (intersects.length > 0) {
        if (intersects[0].object != INTERSECTED) {
            if (INTERSECTED) {
             
            }
            INTERSECTED = intersects[0].object;		
			
			video1.play();

			console.log("intersected");

        }

    }

}

//FUNCIONES ADICIONAlES PARA EJECUCION DE APP
function update() {
    //actualiza contenido de nuestra app AR
    if (arToolkitSource.ready !== false) {
        arToolkitContext.update(arToolkitSource.domElement);
    }
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime; // totalTime =  totalTime + deltaTime 
    update();
    render();
}

