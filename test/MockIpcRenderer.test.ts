import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { MockIpcRenderer } from '../src/MockIpcRenderer'

chai.use(chaiAsPromised)

describe('MockIpcRenderer', () => {
  it('should be able to create a new ipcRenderer', () => {
    const ipcRenderer: Electron.IpcRenderer = new MockIpcRenderer()
    expect(ipcRenderer).to.be.an.instanceof(MockIpcRenderer)
  })

  it('should be able to send a message', () => {
    const ipcRenderer = new MockIpcRenderer()
    ipcRenderer.send('message')
    expect(ipcRenderer.send.calledOnce).to.be.true
    expect(ipcRenderer.send.calledWith('message')).to.be.true
  })

  it('should be able to invoke a message', async () => {
    const ipcRenderer = new MockIpcRenderer()
    ipcRenderer.invoke('message')
    expect(ipcRenderer.invoke.calledOnce).to.be.true
    expect(ipcRenderer.invoke.calledWith('message')).to.be.true
  })

  it('should be able to send a message synchronously', () => {
    const ipcRenderer = new MockIpcRenderer()
    ipcRenderer.sendSync('message')
    expect(ipcRenderer.sendSync.calledOnce).to.be.true
    expect(ipcRenderer.sendSync.calledWith('message')).to.be.true
  })

  it('should be able to post a message', () => {
    const ipcRenderer = new MockIpcRenderer()
    ipcRenderer.postMessage('message')
    expect(ipcRenderer.postMessage.calledOnce).to.be.true
    expect(ipcRenderer.postMessage.calledWith('message')).to.be.true
  })

  it('should be able to send a message to the host', () => {
    const ipcRenderer = new MockIpcRenderer()
    ipcRenderer.sendToHost('message')
    expect(ipcRenderer.sendToHost.calledOnce).to.be.true
    expect(ipcRenderer.sendToHost.calledWith('message')).to.be.true
  })
})
