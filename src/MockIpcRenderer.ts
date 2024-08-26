import EventEmitter from 'events'
import sinon from 'sinon'

export class MockIpcRenderer
  extends EventEmitter
  implements Electron.IpcRenderer
{
  send = sinon.stub()
  invoke = sinon.stub().resolves()
  sendSync = sinon.stub().returns(undefined)
  postMessage = sinon.stub()
  sendTo? = sinon.stub()
  sendToHost = sinon.stub()
}
