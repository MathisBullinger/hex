import Renderer from './render/render2D'
import Scene from './scene'
import Map from './map'
import { Interaction } from './interaction'
import * as Event from './interaction/events'

export default class Game {
  private running = false
  private renderer: Renderer
  private interaction: Interaction
  private scene?: Scene

  constructor() {
    this.initConfig()
    this.step = this.step.bind(this)
    const canvas = document.getElementById('game') as HTMLCanvasElement
    this.renderer = new Renderer(canvas)
    this.interaction = new Interaction(canvas)
  }

  public loadScene() {
    const map = Map.genRadial(5)
    this.scene = new Scene(map)
    this.renderer.setScene(this.scene)
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
    let event: Event.Base
    while ((event = this.interaction.getEvent())) {
      if (event instanceof Event.Zoom) {
        this.renderer.zoom(event.dY)
        continue
      }
      if (event instanceof Event.Pan) {
        this.renderer.pan(event.dX, event.dY)
        continue
      }
      if (event instanceof Event.MouseMove) {
        this.scene?.setHovered(...this.renderer.pxToTile(event.x, event.y))
      }
    }
  }

  private initConfig() {
    const config: Config = {
      renderCoords: true,
    }
    ;(window as any).config = config
  }
}
