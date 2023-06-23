import { Rectangle, Size } from 'electron'

type Availability = 'available' | 'unavailable' | 'unknown'

let displayId = 1

export class MockDisplay implements Electron.Display {
  private _bounds = { x: 0, y: 0, width: 1920, height: 1080 }
  private _menuBarHeight = 30

  id: number
  rotation = 0
  scaleFactor = 1
  touchSupport = 'available' as Availability
  get bounds(): Rectangle {
    return { ...this._bounds }
  }
  set bounds(bounds: Rectangle) {
    Object.assign(this._bounds, bounds)
  }
  get workArea(): Rectangle {
    return {
      x: this._bounds.x,
      y: this._bounds.y + this._menuBarHeight,
      width: this._bounds.width,
      height: this._bounds.height - this._menuBarHeight,
    }
  }
  set workArea(workArea: Rectangle) {
    Object.assign(this.bounds, {
      x: workArea.x,
      y: workArea.y - this._menuBarHeight,
      width: workArea.width,
      height: workArea.height + this._menuBarHeight,
    })
  }
  accelerometerSupport: 'available' | 'unavailable' | 'unknown' = 'unknown'
  monochrome = false
  colorDepth = 24
  colorSpace = 'rgb8'
  get size(): Size {
    return {
      width: this._bounds.width,
      height: this._bounds.height,
    }
  }
  set size(size: Size) {
    Object.assign(this._bounds, size)
  }
  get workAreaSize(): Size {
    return {
      width: this.workArea.width,
      height: this.workArea.height,
    }
  }
  set workAreaSize(size: Size) {
    Object.assign(this.workArea, size)
  }
  depthPerComponent = 24
  displayFrequency = 60
  internal = displayId ? false : true
  label: string

  constructor(display: Partial<Electron.Display> = {}) {
    this.id = displayId++
    this.label = `Display ${this.id}`
    Object.assign(this, display)
    Object.assign(this._bounds, display.size, display.bounds)
  }
}
