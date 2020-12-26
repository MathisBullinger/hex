import type Renderer from './base'

export default abstract class Object {
  abstract render(renderer: Renderer): void
}
