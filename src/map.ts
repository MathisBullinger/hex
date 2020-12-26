import Tile from './tile'

export default class Map {
  public tiles: Tile[]

  constructor() {
    this.tiles = [new Tile(0, 0, 0)]
  }
}
