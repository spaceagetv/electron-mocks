import EventEmitter from 'events'
import sinon from 'sinon'

export class MockIpcMain extends EventEmitter implements Electron.IpcMain {
  handle = sinon.stub()
  handleOnce = sinon.stub()
  removeHandler = sinon.stub()
}
