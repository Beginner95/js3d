function init() {
    const scene = new THREE.Scene();

    let enableFog = false;

    if (enableFog === true) {
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }
    
    const box = getBox(1, 1, 1);
    const plane = getPlane(20);
    const pointLight = getPointLight(1);

    plane.name = 'plane-1';

    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;
    pointLight.position.y = 1.25;

    scene.add(box);
    scene.add(plane);
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
    renderer.setClearColor('rgb(120, 120, 120)');
    getId('webgl').appendChild(renderer.domElement);
    update(renderer, scene, camera);
    return scene;
}

function getBox(w, h, d) {
    let geometry = new THREE.BoxGeometry(w, h, d);
    let material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)'
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}

function getPlane(size) {
    let geometry = new THREE.PlaneGeometry(size, size);
    let material = new THREE.MeshBasicMaterial({
        color: 'rgb(120, 120, 120)',
        side: THREE.DoubleSide
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}

function getSphere(size) {
    let geometry = new THREE.SphereGeometry(size);
    let material = new THREE.MeshPhongMaterial({
        color: 'rgb(120, 120, 120)'
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}

function getPointLight(intensity) {
    return new THREE.PointLight(0xffffff, intensity);
}

const scene = init();

function update(renderer, scene, camera) {
    renderer.render(
        scene,
        camera
    );

    requestAnimationFrame(function () {
        update(renderer, scene, camera);
    })
}

function getId(el) {
    return document.getElementById(el);
}

function c(el) {
    console.log(el);
}