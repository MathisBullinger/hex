import Renderer from './render/render2D'
import Scene from './scene'
import Map from './map'
import { Interaction, HexEvent, ZoomEvent } from './interaction'

export default class Game {
  private running = false
  private renderer: Renderer
  private interaction: Interaction

  constructor() {
    this.step = this.step.bind(this)
    const canvas = document.getElementById('game') as HTMLCanvasElement
    this.renderer = new Renderer(canvas)
    this.interaction = new Interaction(canvas)
  }

  public loadScene() {
    const map = Map.genRadial(50)
    const scene = new Scene(map)
    this.renderer.setScene(scene)
  }

  public start() {
    this.running = true
    this.step()
  }

  private step() {
    if (!this.running) return
    this.handlEvents()
    this.renderer.render()
    requestAnimationFrame(this.step)
  }

  private handlEvents() {
    let event: HexEvent
    while ((event = this.interaction.getEvent())) {
      if (event instanceof ZoomEvent) {
        this.renderer.zoom(event.dY)
      }
    }
  }
}