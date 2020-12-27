import * as Event from './events'

export default class Interaction {
  private events: Event.Base[] = []

  constructor(target: HTMLElement) {
    target.addEventListener('wheel', (e) => {
      if (e.ctrlKey) e.preventDefault()

      let zoom = e.ctrlKey
      if (e.metaKey) zoom = !zoom

      if (zoom) {
        const event = this.createEvent(Event.Zoom)
        event.dY += e.deltaY
      } else {
        const event = this.createEvent(Event.Pan)
        event.dX += e.deltaX
        event.dY += e.deltaY
      }
    })

    target.addEventListener('mousemove', (e) => {
      const event = this.createEvent(Event.MouseMove)
      event.x = e.clientX
      event.y = e.clientY
    })
  }

  public getEvent(): Event.Base {
    return this.events.splice(0, 1)[0]
  }

  private createEvent<T extends new () => Event.Base>(
    type: T
  ): InstanceType<T> {
    let event: InstanceType<T> = this.events.find(
      (e) => e instanceof type
    ) as any
    if (event) return event
    event = new type() as any
    this.events.push(event)
    return event
  }
}
