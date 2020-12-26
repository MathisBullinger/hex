import Renderer from './base'

class Viewport {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {}
}

export default class Renderer2D extends Renderer {
  private readonly ctx = this.target.getContext(
    '2d'
  ) as CanvasRenderingContext2D
  private readonly vp: Viewport

  constructor(readonly target: HTMLCanvasElement) {
    super(target)
    this.vp = new Viewport(-10, -10, 20, 20)
  }

  render() {
    if (!this.scene) return

    this.ctx.fillStyle = this.clearColor
    this.ctx.fillRect(0, 0, this.target.width, this.target.height)

    for (const tile of this.scene.map.tiles) {
      tile.render(this)
    }
  }

  public renderHexagon(x: number, y: number, z: number) {
    console.log('render hex', x, y, z)
  }
}
