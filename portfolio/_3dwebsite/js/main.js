// three.js library
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/////// SET UP /////////////////////////
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30); //set center of the scene to the camera

// Render
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#scene-bg'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Resize
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

/////// LIGHT /////////////////////////
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

/////// LOADERS /////////////////////////
const loadingBarElement = document.querySelector('.loading-bar')
const bodyElement = document.querySelector('body')
const loadingManager = new THREE.LoadingManager(
    () => {
        window.setTimeout(() => {
            gsap.to(overlayMaterial.uniforms.uAlpha, {
                duration: 3,
                value: 0,
                delay: 1
            })
            gsap.to(overlayMaterial.uniforms.uAlpha, {
                duration: 3,
                value: 0,
                delay: 1
            })

            loadingBarElement.classList.add('ended')
            bodyElement.classList.add('loaded')
            loadingBarElement.style.transform = ''

        }, 500)
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        console.log(itemUrl, itemsLoaded, itemsTotal)
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
        console.log(progressRatio)
    },
    () => {

    }
)

const gltfLoader = new GLTFLoader(loadingManager);

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `,
    uniforms: {
        uAlpha: {
            value: 1.0
        }
    },
    transparent: true
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
scene.add(overlay)

/////// THE SCENE /////////////////////////
// Background
const bgTexture = new THREE.TextureLoader().load('img/catcafe.jpg');
scene.background = bgTexture;

// Stars
function addDust(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const dust = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    dust.position.set(x, y, z);
    scene.add(dust);
}

Array(200).fill().forEach(addDust);

// Texture loader
const loader = new THREE.TextureLoader();

// Logo
    const cube = new THREE.BoxGeometry(4, 4, .2);
    const cubeTexture = loader.load('img/tacocat_v3.png');
    const cubeFaces = [
        // Right
        new THREE.MeshPhongMaterial({ color: 0xFFD25C, shininess: 80, }),
        // Left
        new THREE.MeshPhongMaterial({ color: 0xFFD25C, shininess: 80, }),
        // Top
        new THREE.MeshPhongMaterial({ color: 0xFFD25C, shininess: 80, }),
        // Bottom 
        new THREE.MeshPhongMaterial({ color: 0xFFD25C, shininess: 80, }),
        // Front
        new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 80, map: cubeTexture }),
        // Back
        new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 80, reflectivity: .75, map: cubeTexture })
    ]

const cubeLogo = new THREE.Mesh( cube, cubeFaces );
cubeLogo.position.set ( 2.5, 0, -5);
scene.add(cubeLogo);

// Donut
/**
 * GLTF Model
 */
let donut = null

gltfLoader.load(
    './img/donut/scene.gltf',
    (gltf) => {
        // console.log(gltf);
        donut = gltf.scene
        const radius = 15;
        donut.position.x = -5;
        donut.position.z = .1;
        donut.scale.set(radius, radius, radius)
        scene.add(donut)
    }
);

// Scroll Animation
function moveCamera(){
    const findTop = document.body.getBoundingClientRect().top;

    cubeLogo.rotation.y += 0.03;

    camera.position.z = findTop * -0.001;
    camera.position.x = findTop * 0.0009;
    camera.position.y = findTop * -0.0007;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate(){
    requestAnimationFrame(animate);

    donut.rotation.x += 0.007;
    donut.rotation.y += 0.01;
    donut.rotation.z += 0.007;

    renderer.render(scene, camera);
}

animate();

