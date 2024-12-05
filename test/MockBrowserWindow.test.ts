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
    })
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

  it('should be able to set window bounds', async () => {
    const window = new MockBrowserWindow()
    const resizePromise = new Promise((resolve) => {
      window.on('resize', resolve)
    })
    const resizedPromise = new Promise((resolve) => {
      window.on('resized', resolve)
    })
    const movePromise = new Promise((resolve) => {
      window.on('move', resolve)
    })
    const movedPromise = new Promise((resolve) => {
      window.on('moved', resolve)
    })
    window.setBounds({ x: 100, y: 200, width: 723, height: 451 })
    await resizePromise
    await resizedPromise
    await movePromise
    await movedPromise
    expect(window.getBounds()).to.deep.equal({
      x: 100,
      y: 200,
      width: 723,
      height: 451,
    })
    expect(window.getSize()).to.deep.equal([723, 451])
    expect(window.getPosition()).to.deep.equal([100, 200])
  })

  it('should be able to load a URL', async () => {
    const window = new MockBrowserWindow()
    const loadPromise = new Promise((resolve) => {
      // typescript bug
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.webContents.on('did-finish-load', resolve)
    })
    window.loadURL('https://example.com')
    await loadPromise
    sinon.assert.calledOnce(window.webContents.loadURL as sinon.SinonSpy)
    sinon.assert.calledWithExactly(
      window.webContents.loadURL as sinon.SinonSpy,
      'https://example.com',
    )
    sinon.assert.calledOnce(window.webContents.loadURL as sinon.SinonSpy)
    sinon.assert.calledWithExactly(
      window.webContents.loadURL as sinon.SinonSpy,
      'https://example.com',
    )
    expect(window.webContents.getURL()).to.equal('https://example.com')
  })

  it('should be able to load a file', async () => {
    const window = new MockBrowserWindow() as Electron.BrowserWindow
    const loadPromise = new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.webContents.on('did-finish-load', resolve)
    })
    window.loadFile('test/fixtures/index.html')
    await loadPromise
    sinon.assert.calledOnce(window.webContents.loadFile as sinon.SinonSpy)
    sinon.assert.calledWithExactly(
      window.webContents.loadFile as sinon.SinonSpy,
      'test/fixtures/index.html',
    )
    expect(window.webContents.getURL()).to.equal(
      'file://test/fixtures/index.html',
    )
  })

  describe('Visibility', () => {
    it('should be hidden constructed with show: false', async () => {
      const window = new MockBrowserWindow({
        show: false,
      })
      await new Promise((resolve) => {
        window.on('ready-to-show', resolve)
      })
      expect(window.isVisible()).to.be.false
    })

    it('should be visible constructed with show: true', async () => {
      const window = new MockBrowserWindow({
        show: true,
      })
      const didFinishLoadSpy = sinon.spy()
      window.webContents.on('did-finish-load', didFinishLoadSpy)

      const readyToShowSpy = sinon.spy()
      window.on('ready-to-show', readyToShowSpy)

      await window.loadURL('https://example.com')

      sinon.assert.calledOnce(didFinishLoadSpy)
      sinon.assert.notCalled(readyToShowSpy)

      expect(window.isVisible()).to.be.true
    })

    it('should be visible after calling show()', async () => {
      const window = new MockBrowserWindow({
        show: false,
      })
      await new Promise((resolve) => {
        window.on('ready-to-show', resolve)
      })
      expect(window.isVisible()).to.be.false
      window.show()
      expect(window.isVisible()).to.be.true
    })

    it('should be hidden after calling hide()', async () => {
      const window = new MockBrowserWindow({
        show: true,
      })
      expect(window.isVisible()).to.be.true
      window.hide()
      expect(window.isVisible()).to.be.false
    })

    it('should call show() and hide() correctly', async () => {
      const window = new MockBrowserWindow({
        show: false,
      })
      await new Promise((resolve) => {
        window.on('ready-to-show', resolve)
      })
      expect(window.isVisible()).to.be.false
      window.show()
      expect(window.isVisible()).to.be.true
      window.hide()
      expect(window.isVisible()).to.be.false
    })
  })
})
