import EventEmitter from 'events'
import sinon from 'sinon'

// Define a type that checks if `sendTo` exists on `IpcRenderer`
type SendToType = 'sendTo' extends keyof Electron.IpcRenderer
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Electron.IpcRenderer['sendTo']
  : never

export class MockIpcRenderer
  extends EventEmitter
  implements Electron.IpcRenderer
{
  constructor() {
    super()
  }
  send = sinon.stub()
  invoke = sinon.stub().resolves()
  sendSync = sinon.stub().returns(undefined)
  postMessage = sinon.stub()
  sendToHost = sinon.stub()
  sendTo: SendToType = sinon.stub() as SendToType
}
