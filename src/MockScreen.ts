import { EventEmitter } from 'events'
import sinon from 'sinon'
import { MockDisplay } from './MockDisplay'

export class MockScreen extends EventEmitter implements Electron.Screen {
  private _displays: Electron.Display[] = []

  // stub all Electron.Screen methods returning logical values
  getCursorScreenPoint = sinon.spy(() => ({ x: 0, y: 0 }))
  getPrimaryDisplay = sinon.spy(() => this._displays[0])
  getAllDisplays = sinon.spy(() => this._displays)
  getDisplayMatching = sinon.spy(() => this._displays[0])
  getDisplayNearestPoint = sinon.spy(() => this._displays[0])
  dipToScreenPoint = sinon.spy((point: Electron.Point) => {
    return point
  })
  dipToScreenRect = sinon.spy(
    (window: Electron.BrowserWindow | null, rect: Electron.Rectangle) => {
      return rect
    },
  )
  screenToDipPoint = sinon.spy((point: Electron.Point) => {
    return point
  })
  screenToDipRect = sinon.spy(
    (window: Electron.BrowserWindow | null, rect: Electron.Rectangle) => {
      return rect
    },
  )

  constructor(displays: Electron.Display[] = []) {
    super()
    this._displays = displays
    if (!displays.length) {
      this._displays.push(new MockDisplay())
    }
  }

  addDisplay(display?: Electron.Display) {
    if (!display) {
      display = new MockDisplay()
    }
    this._displays.push(display)
    this.emit('display-added', display)
  }

  removeDisplay(display: Electron.Display | number) {
    let d: Electron.Display
    if (typeof display === 'number') {
      d = this._displays.find((dd) => dd.id === display)
    } else {
      d = display
    }
    if (!d) {
      throw new Error(`Display ${display} not found`)
    }
    this._displays = this._displays.filter((dd) => dd.id !== d.id)
    this.emit('display-removed', display)
  }
}
