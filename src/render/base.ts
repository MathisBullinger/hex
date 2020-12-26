import type Scene from '../scene'

export default abstract class Renderer {
  protected scene?: Scene
  protected readonly clearColor = '#222'

  constructor(protected readonly target: HTMLCanvasElement) {
    this.resize()
  }

  public setScene(scene: Scene) {
    this.scene = scene
  }

  public abstract render(): void

  public abstract renderHexagon(x: number, y: number, z: number): void

  protected resize() {
    this.target.width = window.innerWidth * devicePixelRatio
    this.target.height = window.innerHeight * devicePixelRatio
  }
}
