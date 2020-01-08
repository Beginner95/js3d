function init() {
    const scene = new THREE.Scene();
    const gui = new dat.GUI();

    let enableFog = false;

    if (enableFog === true) {
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);
    }
    
    
    const plane = getPlane(30);
    const spotLight = getDirectionalLight(1);
    const sphere = getSphere(0.05);
    const boxGrid = getBoxGrid(10, 1.5);

    plane.name = 'plane-1';

    plane.rotation.x = Math.PI/2;
    spotLight.position.y = 5;
    spotLight.intensity = 1;

    gui.add(spotLight, 'intensity', 0, 10);
    gui.add(spotLight.position, 'x', 0, 25);
    gui.add(spotLight.position, 'y', 0, 25);
    gui.add(spotLight.position, 'z', 0, 25);
    gui.add(spotLight, 'penumbra', 0, 1);

    scene.add(plane);
    spotLight.add(sphere);
    scene.add(spotLight);
    scene.add(boxGrid);

    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth/window.innerHeight,
        1,
        1000
    );

    camera.position.x = 8;
    camera.position.y = 15;
    camera.position.z = 25;

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

function getBoxGrid(amount, separationMultiplier) {
    let group = new THREE.Group();

    for (let i = 0; i < amount; i++) {
        let obj = getBox(1, 2, 1);
        obj.position.x = i * separationMultiplier;
        obj.position.y = obj.geometry.parameters.height/2;
        group.add(obj);
        for (let j = 1; j < amount; j++) {
            let obj = getBox(1, 2, 1);
            obj.position.x = i * separationMultiplier;
            obj.position.y = obj.geometry.parameters.height/2;
            obj.position.z = j * separationMultiplier;
            group.add(obj);
        }
    }

    group.position.x = -(separationMultiplier * (amount - 1))/2;
    group.position.z = -(separationMultiplier * (amount - 1))/2;
    return group;
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

function getSpotLight(intensity) {
    let light = new THREE.SpotLight(0xffffff, intensity);
    light.castShadow = true;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
}

function getDirectionalLight(intensity) {
    let light = new THREE.DirectionalLight(0xffffff, intensity);
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