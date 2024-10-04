const windowSize = {
    height: window.innerHeight,
    width: window.innerWidth
};


// Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, windowSize.width / windowSize.height, 0.1, 1000);
camera.position.z = 5;


// Canvas
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(windowSize.width, windowSize.height);


// Mars texture
const marsTexture = new THREE.TextureLoader().load('./models/mars.jpg');


// Sphere geometry
const spheregeo = new THREE.SphereGeometry(2, 100, 100);
const spheremat = new THREE.MeshStandardMaterial({ map: marsTexture });
const sphere = new THREE.Mesh(spheregeo, spheremat);
scene.add(sphere);


// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 2, 4);
scene.add(light);


// Function to check if the user is on a mobile device
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}


// Mouse move event
window.addEventListener('mousemove', function (e) {

    if (!isMobile()) {  // Only enable mouse move on desktop
        e.preventDefault();

        let mouseXCords = e.clientX
        let mouseYCords = e.clientY

        xPos = (mouseXCords / window.innerWidth) * 2 - 1;
        yPos = - (mouseYCords / window.innerHeight) * 2 + 1;

        // Make the sphere follow the mouse
        let vector = new THREE.Vector3(-xPos, -yPos, 0.1);
        vector.unproject(camera);
        vector.sub(camera.position).normalize();

        vector.x *= 1.5;
        vector.y *= 1.5;

        sphere.lookAt(vector);
    }

});

// Resize event
window.addEventListener('resize', () => {
    windowSize.height = window.innerHeight;
    windowSize.width = window.innerWidth;
    camera.aspect = windowSize.width / windowSize.height;
    camera.updateProjectionMatrix();
    renderer.setSize(windowSize.width, windowSize.height);
});



// Animate function
function animate() {
    requestAnimationFrame(animate);

    if (isMobile()) {
        const orbitControls = new THREE.OrbitControls(camera, canvas);

        orbitControls.autoRotate = true;
        orbitControls.autoRotateSpeed = 6;
        orbitControls.enabled = false; //disable touch or click actions on mars
        orbitControls.update();

    }

    renderer.render(scene, camera);
}

animate();
