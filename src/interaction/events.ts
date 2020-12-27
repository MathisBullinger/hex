export abstract class Base {}

export class Zoom implements Base {
  constructor(public dY = 0) {}
}

export class Pan implements Base {
  constructor(public dX = 0, public dY = 0) {}
}

export class MouseMove implements Base {
  constructor(public x = 0, public y = 0) {}
}
