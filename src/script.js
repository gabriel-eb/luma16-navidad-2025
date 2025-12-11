import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import GUI from "lil-gui";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Objects
 */
const xmasTextrue = textureLoader.load("navidad_bake.jpg");
xmasTextrue.flipY = false;
xmasTextrue.colorSpace = SRGBColorSpace;

const xmasMaterial = new MeshBasicMaterial({ map: xmasTextrue });
const yellowLightsMaterial = new MeshBasicMaterial({ color: 0xffeeaa });

gltfLoader.load("navidad.glb", (gltf) => {
  const children = gltf.scene.children;

  gltf.scene.traverse((child) => (child.material = xmasMaterial));
  children.map((child) => {
    if (child.name.includes("luz")) {
      child.material = yellowLightsMaterial;
    }
  });

  // const bakedMesh = children.find(({ name }) => name === "baked");
  // const lampLMesh = children.find(({ name }) => name === "bulb_l");
  // const lampRMesh = children.find(({ name }) => name === "bulb_r");
  // const portalMesh = children.find(({ name }) => name === "portal");

  // bakedMesh.material = bakedMaterial;
  // lampLMesh.material = poleLightMaterial;
  // lampRMesh.material = poleLightMaterial;
  // portalMesh.material = portalMaterial;

  scene.add(gltf.scene);
});

// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#181818");

/**
 * Debugging
 */

const gui = new GUI({
  width: 400,
  title: "Debug",
});

if (window.location.hash && window.location.hash.includes("debug")) {
  gui.show(true);
} else {
  gui.show(false);
}

// Animations
const clock = new Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects movement

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
