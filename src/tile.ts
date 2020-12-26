import RenderObject from './render/object'
import type Renderer from './render/base'

export default class Tile implements RenderObject {
  constructor(private readonly q: number, private readonly r: number) {}

  render(renderer: Renderer) {
    renderer.renderHexagon(this.q, this.r, 1)
  }
}
