import RenderObject from './render/object'
import type Renderer from './render/base'

export default class Tile implements RenderObject {
  constructor(
    private readonly q: number,
    private readonly r: number,
    private readonly s = -q - r
  ) {}

  render(renderer: Renderer) {
    renderer.renderHexagon(this.q, this.r, 1)
  }

  get coords(): TileCoords {
    return [this.q, this.r, this.s]
  }
}
