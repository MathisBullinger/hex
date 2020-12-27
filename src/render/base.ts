import type Scene from '../scene'

export default abstract class Renderer {
  protected scene?: Scene
  protected readonly clearColor = '#222'

  constructor(protected readonly target: HTMLCanvasElement) {
    this.resize()
    new ResizeObserver(() => this.resize()).observe(target)
  }

  public setScene(scene: Scene) {
    this.scene = scene
  }

  public abstract render(): void

  public abstract renderHexagon(x: number, y: number, z: number): void

  public abstract zoom(dy: number): void
  public abstract pan(dx: number, dy: number): void

  protected resize(): boolean {
    const width = window.innerWidth * devicePixelRatio
    const height = window.innerHeight * devicePixelRatio
    if (width === this.target.width && height === this.target.height)
      return false
    this.target.width = width
    this.target.height = height
    return true
  }
}
