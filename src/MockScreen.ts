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
    (thing: Electron.BrowserWindow | Electron.Rectangle) => {
      return thing as Electron.Rectangle
    }
  )
  screenToDipPoint = sinon.spy((point: Electron.Point) => {
    return point
  })
  screenToDipRect = sinon.spy(
    (thing: Electron.BrowserWindow | Electron.Rectangle) => {
      return thing as Electron.Rectangle
    }
  )

  constructor(displays: Electron.Display[] = []) {
    super()
    this._displays = displays
    if (!displays.length) {
      this._displays.push(new MockDisplay())
    }
  }

  addDisplay(display: Electron.Display) {
    this._displays.push(display)
    this.emit('display-added', display)
  }
  removeDisplay(display: Electron.Display) {
    this._displays = this._displays.filter((d) => d.id !== display.id)
    this.emit('display-removed', display)
  }
}
