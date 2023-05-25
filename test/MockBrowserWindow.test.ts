import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { MockBrowserWindow } from '../src/MockBrowserWindow'

chai.use(chaiAsPromised)

describe('MockBrowserWindow', () => {
  it('should be able to create a new window', () => {
    const window = new MockBrowserWindow()
    expect(window).to.be.an.instanceof(MockBrowserWindow)
  })

  it('should be able to create a new window with options', async () => {
    const window = new MockBrowserWindow({
      x: 100,
      y: 200,
      width: 723,
      height: 451,
      backgroundColor: '#000000',
      show: false,
    }) as Electron.BrowserWindow
    // expect ready-to-show event to be emitted
    const readyPromise = new Promise((resolve) => {
      window.on('ready-to-show', resolve)
    })
    await readyPromise
    expect(window).to.be.an.instanceof(MockBrowserWindow)
    expect(window.getBounds()).to.deep.equal({
      x: 100,
      y: 200,
      width: 723,
      height: 451,
    })
    expect(window.getSize()).to.deep.equal([723, 451])
    expect(window.getPosition()).to.deep.equal([100, 200])
    expect(window.isVisible()).to.be.false
    expect(window.getBackgroundColor()).to.equal('#000000')
    const showPromise = new Promise((resolve) => {
      window.on('show', resolve)
    })
    window.show()
    await showPromise
    expect(window.isVisible()).to.be.true
  })

  it('should emit correct events when window is closed', async () => {
    const window = new MockBrowserWindow()
    const closePromise = new Promise((resolve) => {
      window.on('close', resolve)
    })
    const closedPromise = new Promise((resolve) => {
      window.on('closed', resolve)
    })
    window.close()
    await closePromise
    await closedPromise
  })

  it('should be able to load a URL', async () => {
    const window = new MockBrowserWindow() as Electron.BrowserWindow
    const loadPromise = new Promise((resolve) => {
      window.webContents.on('did-finish-load', resolve)
    })
    window.loadURL('https://example.com')
    await loadPromise
    sinon.assert.calledOnce(window.webContents.loadURL as sinon.SinonSpy)
    sinon.assert.calledWithExactly(
      window.webContents.loadURL as sinon.SinonSpy,
      'https://example.com'
    )
    sinon.assert.calledOnce(window.webContents.loadURL as sinon.SinonSpy)
    sinon.assert.calledWithExactly(
      window.webContents.loadURL as sinon.SinonSpy,
      'https://example.com'
    )
  })

  it('should be able to load a file', async () => {
    const window = new MockBrowserWindow() as Electron.BrowserWindow
    const loadPromise = new Promise((resolve) => {
      window.webContents.on('did-finish-load', resolve)
    })
    window.loadFile('test/fixtures/index.html')
    await loadPromise
    sinon.assert.calledOnce(window.webContents.loadFile as sinon.SinonSpy)
    sinon.assert.calledWithExactly(
      window.webContents.loadFile as sinon.SinonSpy,
      'test/fixtures/index.html'
    )
  })
})
