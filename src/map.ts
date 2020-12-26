import Tile from './tile'

export default class Map {
  public tiles: Tile[] = []

  public static genRadial(num: number): Map {
    const map = new Map()

    for (let q = -num; q <= num; q++) {
      for (let r = -num; r <= num; r++) {
        const s = -q - r
        if (Math.sqrt(q ** 2 + r ** 2 + s ** 2) > num) continue
        map.tiles.push(new Tile(q, r))
      }
    }

    return map
  }
}
