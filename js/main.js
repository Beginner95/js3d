function init() {
    const scene = new THREE.Scene();
    
    const box = getBox(1, 1, 1);
    const plane = getPlane(4);

    box.position.y = box.geometry.parameters.height/2;
    plane.rotation.x = Math.PI/2;

    scene.add(box);
    scene.add(plane);

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
    getId('webgl').appendChild(renderer.domElement);
    renderer.render(
        scene,
        camera
    );
}

function getBox(w, h, d) {
    let geometry = new THREE.BoxGeometry(w, h, d);
    let material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}

function getPlane(size) {
    let geometry = new THREE.PlaneGeometry(size, size);
    let material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide
    });

    return new THREE.Mesh(
        geometry,
        material
    );
}

init();

function getId(el) {
    return document.getElementById(el);
}

function c(el) {
    console.log(el);
}