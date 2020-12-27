import RenderObject from './render/object'
import type Renderer from './render/base'

export default class Tile implements RenderObject {
  public hovered = false

  constructor(
    public readonly q: number,
    public readonly r: number,
    public readonly s = -q - r
  ) {}

  render(renderer: Renderer) {
    renderer.renderTile(this)
  }

  get coords(): TileCoords {
    return [this.q, this.r, this.s]
  }
}
