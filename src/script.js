import {
  Clock,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  Sprite,
  SpriteMaterial,
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
const yellowLightsMaterial = new MeshStandardMaterial({
  emissive: 0xbeff13,
  emissiveIntensity: 8.0,
});
const blueLightsMaterial = new MeshStandardMaterial({
  emissive: 0x3c90ff,
  emissiveIntensity: 8.0,
});
const violetLightsMaterial = new MeshStandardMaterial({
  emissive: 0xe22eff,
  emissiveIntensity: 8.0,
});

gltfLoader.load("navidad.glb", (gltf) => {
  const children = gltf.scene.children;

  gltf.scene.traverse((child) => (child.material = xmasMaterial));
  const yellowLights = children.filter(({ name }) =>
    name.includes("luz_amarilla")
  );
  const blueLights = children.filter(({ name }) => name.includes("luz_azul"));
  const violetLights = children.filter(({ name }) =>
    name.includes("luz_violeta")
  );
  // const portalMesh = children.find(({ name }) => name === "portal");

  yellowLights.forEach((child) => {
    child.material = yellowLightsMaterial;
  });
  blueLights.forEach((child) => {
    child.material = blueLightsMaterial;
  });
  violetLights.forEach((child) => {
    child.material = violetLightsMaterial;
  });
  // portalMesh.material = portalMaterial;

  scene.add(gltf.scene);
});

// Test gift
// const regalo = new Mesh(
//   new BoxGeometry(0.4, 0.4, 0.4),
//   new MeshBasicMaterial({ color: 0x2244dd })
// );
// regalo.position.set(0.4, 0.2, 0.4);
// scene.add(regalo);

// const spriteMap = textureLoader.load("ribbon.png");
// spriteMap.colorSpace = SRGBColorSpace;
// const spriteMaterial = new SpriteMaterial({ map: spriteMap });
// const sprite = new Sprite(spriteMaterial);
// sprite.position.set(0.4, 0.5, 0.4);
// sprite.scale.set(0.5,0.5,0.5);
// scene.add(sprite);

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
