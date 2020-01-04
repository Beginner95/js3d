function init() {
    const scene = new THREE.Scene();
    const gui = new dat.GUI();

    let enableFog = false;

    if (enableFog === true) {
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }
    
    const box = getBox(1, 1, 1);
    const plane = getPlane(20);
    const pointLight = getPointLight(1);
    const sphere = getSphere(0.05);

    plane.name = 'plane-1';

    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;
    pointLight.position.y = 1.25;
    pointLight.intensity = 2;

    gui.add(pointLight, 'intensity', 0, 10);
    gui.add(pointLight.position, 'y', 0, 5);

    scene.add(box);
    scene.add(plane);
    pointLight.add(sphere);
    scene.add(pointLight);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );

    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('rgb(120, 120, 120)');
    getId('webgl').appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    update(renderer, scene, camera, controls);
    return scene;
}

function getBox(w, h, d) {
    let geometry = new THREE.BoxGeometry(w, h, d);
    let material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)'
    });

    let mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.castShadow = true;
    return mesh;
}

function getPlane(size) {
    let geometry = new THREE.PlaneGeometry(size, size);
    let material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)',
        side: THREE.DoubleSide
    });

    let mesh = new THREE.Mesh(
        geometry,
        material
    );

    mesh.receiveShadow = true;
    return mesh;
}

function getSphere(size) {
    let geometry = new THREE.SphereGeometry(size, 24, 24);
    let material = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255, 255)'
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}

function getPointLight(intensity) {
    let light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
}

const scene = init();

function update(renderer, scene, camera, controls) {
    renderer.render(
        scene,
        camera
    );

    controls.update();

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    })
}

function getId(el) {
    return document.getElementById(el);
}

function c(el) {
    console.log(el);
}