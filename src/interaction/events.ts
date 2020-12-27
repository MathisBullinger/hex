export abstract class HexEvent {}

export class ZoomEvent implements HexEvent {
  constructor(public dY = 0) {}
}

export class PanEvent implements HexEvent {
  constructor(public dX = 0, public dY = 0) {}
}
