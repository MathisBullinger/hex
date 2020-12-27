import Tile from './tile'

export default class Map {
  public tiles: Tile[] = []

  public static genRadial(num: number): Map {
    const map = new Map()

    for (let q = -num; q <= num; q++) {
      for (let r = -num; r <= num; r++) {
        const tile = new Tile(q, r)
        if (Map.distance(tile.coords) > num) continue
        map.tiles.push(tile)
      }
    }

    return map
  }

  public static distance(a: TileCoords, b: TileCoords = [0, 0, 0]): number {
    return (
      (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2])) /
      2
    )
  }
}
