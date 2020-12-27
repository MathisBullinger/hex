import type Map from './map'

export default class Scene {
  constructor(public readonly map: Map) {}

  public setHovered(...coords: TileCoords) {
    this.map.setHovered(this.map.getTile(...coords))
  }
}
