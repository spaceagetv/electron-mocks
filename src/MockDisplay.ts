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
  bounds: Rectangle
  workArea: Rectangle
  accelerometerSupport: 'available' | 'unavailable' | 'unknown' = 'unknown'
  monochrome = false
  colorDepth = 24
  colorSpace = 'rgb8'
  size: Size
  workAreaSize: Size
  depthPerComponent = 24
  displayFrequency = 60
  internal = displayId ? false : true
  label: string

  constructor(display: Partial<Electron.Display> = {}) {
    this.id = displayId++
    this.label = `Display ${this.id}`
    Object.assign(this, display)
    Object.assign(this._bounds, display.size, display.bounds)
    this.size = {
      width: this._bounds.width,
      height: this._bounds.height,
    }
    this.workArea = {
      x: this._bounds.x,
      y: this._bounds.y + this._menuBarHeight,
      width: this._bounds.width,
      height: this._bounds.height - this._menuBarHeight,
    }
    this.workAreaSize = {
      width: this.workArea.width,
      height: this.workArea.height,
    }
    this.bounds = {
      x: this._bounds.x,
      y: this._bounds.y,
      width: this._bounds.width,
      height: this._bounds.height,
    }
  }
}
