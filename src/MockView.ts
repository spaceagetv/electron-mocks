import { View } from 'electron'
import EventEmitter from 'events'
import sinon from 'sinon'

export class MockView extends EventEmitter implements View {
  constructor() {
    super()
  }

  _bounds = { x: 0, y: 0, width: 640, height: 480 }

  children = [] as View[]

  addChildView = sinon.spy((view: View) => {
    this.children.push(view)
  })
  removeChildView = sinon.spy()
  setBounds = sinon.spy((bounds: Electron.Rectangle) => {
    this._bounds = bounds
    this.emit('bounds-changed', bounds)
  })
  getBounds = sinon.spy(() => {
    return { ...this._bounds }
  })
  setBackgroundColor = sinon.spy()
  setBorderRadius = sinon.spy()
  setVisible = sinon.spy()
}
