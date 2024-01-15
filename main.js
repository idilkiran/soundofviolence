import * as THREE from 'three'; 
import "./style.css";
import { gsap } from "gsap";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import globe from "./image/globe_1.jpeg"
import sound from './sound/track_02.mp3'

//Scene
const scene = new THREE.Scene()

//Create our sphere
const geometry = new THREE.SphereGeometry(4, 64, 64)
const material = new THREE.MeshStandardMaterial({
    //color: "#00ff83",
    map: new THREE.TextureLoader().load(globe)
  })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, false);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Light
const light = new THREE.PointLight( 0xffffff, 70, 100, 1.7);
light.position.set(0, 10, 10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)



//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width , sizes.height)
renderer.setPixelRatio(3)
renderer.render(scene, camera)

// Controls
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

// Audio
const listener = new THREE.AudioListener()
camera.add(listener)

// Audio loader
const audioLoader = new THREE.AudioLoader()

const violence_sound = new THREE.Audio (listener)
audioLoader.load(sound, function(buffer) {
violence_sound.setBuffer(buffer)
violence_sound.setLoop(false)
violence_sound.setVolume(0.1)
})


//Resize
window.addEventListener("resize", () => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop()

//Timeline
const tl = gsap.timeline({ defaults: { duration: 1} })
tl.fromTo(mesh.scale, { z:0, x:0, y:0}, {z:1, x:1, y:1 })
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", { opacity : 0 }, { opacity: 1})

//Mouse animation color
let mouseDown = false
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {

function render() {
  // Update the ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects([mesh]);

  if (intersects.length > 0) {
      // Handle intersection here
      document.body.style.cursor = 'pointer'; // or use 'crosshair', 'grab', etc.
      if(mouseDown){
        violence_sound.play()
    } 
  }
  else {
    // Reset cursor style when not hovering over the sphere
    document.body.style.cursor = 'default';
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render()
//violence_sound.stop()
})
 

