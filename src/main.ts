import "./style.css"
import * as THREE from "three"
import "./core/controls"
import { renderer, updateRenderer } from "./core/renderer"
import { camera } from "./core/camera"
import { gui, fpsGraph } from "./core/gui"

const scene = new THREE.Scene()

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight("#ffffff", 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshToonMaterial({
    color: new THREE.Color("#5EDCAE"),
    wireframe: false,
  })
)

sphere.position.set(0, 2, 0)
sphere.castShadow = true

const sphereCtrls = gui.addFolder({
  title: "Sphere",
})

sphereCtrls.addInput(sphere.position, "x", {
  label: "pos x",
  min: -10,
  max: 10,
  step: 0.1,
})
sphereCtrls.addInput(sphere.position, "y", {
  label: "pos y",
  min: -10,
  max: 10,
  step: 0.1,
})
sphereCtrls.addInput(sphere.position, "z", {
  label: "pos z",
  min: -10,
  max: 10,
  step: 0.1,
})

sphereCtrls.addInput(sphere.material, "wireframe")

scene.add(sphere)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshToonMaterial({
    color: new THREE.Color("#444"),
  })
)

plane.receiveShadow = true
plane.rotation.set(-Math.PI / 2, 0, 0)
scene.add(plane)

updateRenderer()

function animate() {
  requestAnimationFrame(animate)
  fpsGraph.begin()
  renderer.render(scene, camera)
  fpsGraph.end()
}
animate()
