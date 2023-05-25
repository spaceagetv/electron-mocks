import { EventEmitter } from 'events'
import sinon from 'sinon'
import { MockDisplay } from './MockDisplay'

export class MockScreen extends EventEmitter implements Electron.Screen {
  private _displays: Electron.Display[] = []

  // stub all Electron.Screen methods returning logical values
  getCursorScreenPoint = sinon.stub().returns({ x: 0, y: 0 })
  getPrimaryDisplay = sinon.stub().returns(this._displays[0])
  getAllDisplays = sinon.stub().returns(this._displays)
  getDisplayMatching = sinon.stub().returns(this._displays[0])
  getDisplayNearestPoint = sinon.stub().returns(this._displays[0])
  dipToScreenPoint = sinon.stub((point: Electron.Point) => {
    return point
  })
  dipToScreenRect = sinon.stub(
    (thing: Electron.BrowserWindow | Electron.Rectangle) => {
      return thing as Electron.Rectangle
    }
  )
  screenToDipPoint = sinon.stub((point: Electron.Point) => {
    return point
  })
  screenToDipRect = sinon.stub(
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
  }
  removeDisplay(display: Electron.Display) {
    this._displays = this._displays.filter((d) => d.id !== display.id)
  }
}
