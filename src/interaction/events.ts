export abstract class HexEvent {}

export class ZoomEvent implements HexEvent {
  constructor(public dY = 0) {}
}
