import { MockAutoUpdater } from '../src'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('MockAutoUpdater', () => {
  it('should be defined', () => {
    expect(MockAutoUpdater).to.be.not.undefined
  })

  it('should be a class', () => {
    expect(typeof MockAutoUpdater).to.equal('function')
  })

  it('should instantiate', () => {
    const mockAutoUpdater = new MockAutoUpdater()
    expect(mockAutoUpdater).to.be.not.undefined
  })

  it('should be able to setUrl()', () => {
    const mockAutoUpdater = new MockAutoUpdater() as Electron.AutoUpdater
    mockAutoUpdater.setFeedURL({
      url: 'https://example.com',
      headers: {
        'User-Agent': 'MockAutoUpdater',
      },
      serverType: 'json',
    })
    expect(mockAutoUpdater.getFeedURL()).to.equal('https://example.com')
  })

  it('should be able to call checkForUpdates()', () => {
    const mockAutoUpdater = new MockAutoUpdater() as Electron.AutoUpdater
    mockAutoUpdater.checkForUpdates()
    expect(mockAutoUpdater.checkForUpdates).to.have.been.calledOnce
  })

  it('should be able to call quitAndInstall()', () => {
    const mockAutoUpdater = new MockAutoUpdater() as Electron.AutoUpdater
    mockAutoUpdater.quitAndInstall()
    expect(mockAutoUpdater.quitAndInstall).to.have.been.calledOnce
  })
})
