import { HexEvent, ZoomEvent } from './events'

export default class Interaction {
  private events: HexEvent[] = []

  constructor(target: HTMLElement) {
    target.addEventListener('wheel', (e) => {
      const event = this.createEvent(ZoomEvent)
      event.dY += e.deltaY
    })
  }

  public getEvent(): HexEvent {
    return this.events.splice(0, 1)[0]
  }

  private createEvent<T extends new () => HexEvent>(type: T): InstanceType<T> {
    let event: InstanceType<T> = this.events.find(
      (e) => e instanceof type
    ) as any
    if (event) return event
    event = new type() as any
    this.events.push(event)
    return event
  }
}
