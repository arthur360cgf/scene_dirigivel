import THREE, {
  Scene,
  AxesHelper,
  AmbientLight,
  DirectionalLight,
  Mesh,
  SphereGeometry,
  BufferGeometry,
  MeshToonMaterial,
  PlaneGeometry,
  Color,
} from "three"
import { renderer, updateRenderer } from "../core/renderer"

import { gui } from "../core/gui"

export const scene = new Scene()

// Axes Helper
const axesHelper = new AxesHelper(0.5)
scene.add(axesHelper)

gui.addInput(axesHelper, "visible", {
  label: "AxesHelper",
})

const ambientLight = new AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight("#ffffff", 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 500
directionalLight.shadow.normalBias = 0.5
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

const PARAMS = {
  color: "#5EDCAE",
}

const circulo = new Mesh(
  new SphereGeometry(0.75, 32, 32),
  new MeshToonMaterial({
    color: 0xffff00,
    wireframe: false,
  })
)
 

circulo.position.set(-5.8, 7.2, -6.7)
circulo.castShadow = true

const circuloCtrls = gui.addFolder({
  title: "Sphere",
})

circuloCtrls.addInput(circulo.position, "x", {
  label: "pos x",
  min: -10,
  max: 10,
  step: 0.1,
})
circuloCtrls.addInput(circulo.position, "y", {
  label: "pos y",
  min: -10,
  max: 10,
  step: 0.1,
})
circuloCtrls.addInput(circulo.position, "z", {
  label: "pos z",
  min: -10,
  max: 10,
  step: 0.1,
})
circuloCtrls.addInput(PARAMS, "color").on("change", (e) => {
  sphere.material.color = new Color(e.value)
})

circuloCtrls.addInput(circulo.material, "wireframe")

scene.add(circulo)


const sphere = new Mesh(
  new SphereGeometry(0.75, 37, 32),
  new MeshToonMaterial({
    color: new Color(PARAMS.color),
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
sphereCtrls.addInput(PARAMS, "color").on("change", (e) => {
  sphere.material.color = new Color(e.value)
})

sphereCtrls.addInput(sphere.material, "wireframe")

scene.add(sphere)


const plane = new Mesh(
  new PlaneGeometry(10, 10, 10, 10),
  new MeshToonMaterial({
    color: new Color("#444"),
  })
)

plane.receiveShadow = true
plane.rotation.set(-Math.PI / 2, 0, 0)
scene.add(plane)

export function updateScene() {
  updateRenderer()
}
