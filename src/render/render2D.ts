import Renderer from './base'

class Viewport {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {}

  get center(): [x: number, y: number] {
    return [this.x + this.w / 2, this.y + this.h / 2]
  }

  set center([x, y]: [x: number, y: number]) {
    this.x = x - this.w / 2
    this.y = y - this.h / 2
  }

  fit(ratio: number) {
    const vpMin = Math.min(this.w, this.h)
    this.w = ratio > 1 ? vpMin : vpMin * (1 / ratio)
    this.h = ratio < 1 ? vpMin : vpMin * ratio
  }
}

export default class Renderer2D extends Renderer {
  private readonly ctx = this.target.getContext(
    '2d'
  ) as CanvasRenderingContext2D
  private readonly vp: Viewport

  constructor(readonly target: HTMLCanvasElement, vpMin = 20) {
    super(target)
    const ratio = this.target.height / this.target.width
    const w = ratio > 1 ? vpMin : vpMin * (1 / ratio)
    const h = ratio < 1 ? vpMin : vpMin * ratio
    const x = -w / 2
    const y = -h / 2
    this.vp = new Viewport(x, y, w, h)
  }

  render() {
    if (!this.scene) return

    this.ctx.fillStyle = this.clearColor
    this.ctx.fillRect(0, 0, this.target.width, this.target.height)
    this.ctx.strokeStyle = '#fff'

    for (const tile of this.scene.map.tiles) {
      tile.render(this)
    }
  }

  public renderHexagon(q: number, r: number, md = 1, rotate = Math.PI / 6) {
    const center = this.hex2Vp(q, r)
    const verts: [x: number, y: number][] = []

    for (let i = 0; i < 6; i++) {
      const rad = (i / 6) * Math.PI * 2 + rotate
      const x = center[0] + (md / this.vp.w) * Math.sin(rad)
      const y = center[1] + (md / this.vp.h) * Math.cos(rad)
      verts.push([x * this.target.width, y * this.target.height])
    }

    this.ctx.beginPath()
    this.ctx.moveTo(verts[5][0], verts[5][1])

    for (let i = 0; i < verts.length; i++)
      this.ctx.lineTo(verts[i][0], verts[i][1])

    this.ctx.stroke()
  }

  public zoom(dy: number) {
    const dz = 1 + dy / 100
    const center = this.vp.center
    this.vp.w *= dz
    this.vp.h *= dz
    this.vp.center = center
  }

  private hex2Vp(q: number, r: number): [x: number, y: number] {
    const x = (3 / 2) * q
    const y = (Math.sqrt(3) / 2) * q + Math.sqrt(3) * r
    return [(x - this.vp.x) / this.vp.w, (y - this.vp.y) / this.vp.h]
  }

  resize(): boolean {
    if (!this.vp) return super.resize()
    if (!super.resize()) return false
    const center = this.vp.center
    this.vp.fit(this.target.height / this.target.width)
    this.vp.center = center
    this.render()
    return true
  }
}
