export function cubeRound(cube: CubeCoords): CubeCoords {
  let rx = Math.round(cube[0])
  let ry = Math.round(cube[1])
  let rz = Math.round(cube[2])

  let dx = Math.abs(rx - cube[0])
  let dy = Math.abs(ry - cube[1])
  let zd = Math.abs(rz - cube[2])

  if (dx > dy && dx > zd) rx = -ry - rz
  else if (dy > zd) ry = -rx - rz
  else rz = -rx - ry

  return [rx, ry, rz]
}
