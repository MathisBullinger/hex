import Renderer from './render/render2D'
import Scene from './scene'
import Map from './map'
export default null

const canvas = document.getElementById('game') as HTMLCanvasElement
const renderer = new Renderer(canvas)

const map = Map.genRadial(10)
const scene = new Scene(map)
renderer.setScene(scene)

renderer.render()
