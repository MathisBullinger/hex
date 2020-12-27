import Renderer from './render/render2D'
import Scene from './scene'
import Map from './map'
import { Interaction, HexEvent, ZoomEvent, PanEvent } from './interaction'

export default class Game {
  private running = false
  private renderer: Renderer
  private interaction: Interaction

  constructor() {
    this.initConfig()
    this.step = this.step.bind(this)
    const canvas = document.getElementById('game') as HTMLCanvasElement
    this.renderer = new Renderer(canvas)
    this.interaction = new Interaction(canvas)
  }

  public loadScene() {
    const map = Map.genRadial(5)
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
        continue
      }
      if (event instanceof PanEvent) {
        this.renderer.pan(event.dX, event.dY)
        continue
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
