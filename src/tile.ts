import RenderObject from './render/object'
import type Renderer from './render/base'

export default class Tile implements RenderObject {
  constructor(
    private readonly x: number,
    private readonly y: number,
    private readonly z: number
  ) {}

  render(renderer: Renderer) {
    renderer.renderHexagon(this.x, this.y, this.z)
  }
}
