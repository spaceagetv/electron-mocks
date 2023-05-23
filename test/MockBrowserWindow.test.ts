import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
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
})
