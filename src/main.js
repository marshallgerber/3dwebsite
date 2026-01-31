import { defineConfig} from 'vite';

export default defineConfig({
  base: '/3dwebsite/', 
})




import './style.css'
import * as THREE from 'three';

import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader.js';

import{OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import spacepath from './assets/IMG_20250522_125458667_HDR.jpg';

import johnBennet from './assets/IMG_20250928_110649058_HDR.jpg';

import timothee from './assets/marty mauser.png';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, .1, 1000 )

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial({ color: 0x0044ff });
const torusknot = new THREE.Mesh( geometry, material );

scene.add(torusknot)

const pointLight = new THREE.PointLight(0xffffff, 15000)
pointLight.position.set(30, 30, 30)

const ambientLight = new THREE.AmbientLight (0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0x000000})
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load(spacepath)
scene.background = spaceTexture;

const johnTexture = new THREE.TextureLoader().load(johnBennet);

const john = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: johnTexture })
);

scene.add(john);

const moonTexture = new THREE.TextureLoader().load(timothee);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: moonTexture,
  })
)

moon.position.z = 30
moon.position.y = 24
moon.position.setX(-10);

scene.add(moon)

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += .05;
  moon.rotation.y += .075
  moon.rotation.z += .05

  john.rotation.y +=.01
  john.rotation.z +=.01

  camera.position.z = 30 + t * -.05;
}

document.body.onscroll = moveCamera




function animate (){
  requestAnimationFrame(animate);

  torusknot.rotation.x += 0.01;
  torusknot.rotation.y += 0.005;
  torusknot.rotation.z += .01;

  controls.update();

  renderer.render( scene, camera);
}

animate()

