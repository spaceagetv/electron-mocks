import { MockDownloadItem } from '../src'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

describe('MockDownloadItem', () => {
  it('should create an instance', () => {
    const mockDownloadItem = new MockDownloadItem(
      'https://example.com'
    ) as Electron.DownloadItem
    expect(mockDownloadItem).to.be.not.undefined
  })

  it('should be able to get the URL', () => {
    const mockDownloadItem = new MockDownloadItem(
      'https://example.com'
    ) as Electron.DownloadItem
    expect(mockDownloadItem.getURL()).to.equal('https://example.com')
  })

  it('should be able to get the filename', () => {
    const mockDownloadItem = new MockDownloadItem(
      'https://example.com/example.txt?foo=bar&baz=qux'
    ) as Electron.DownloadItem
    expect(mockDownloadItem.getFilename()).to.equal('example.txt')
  })

  it('should be able to set/get the save path', () => {
    const mockDownloadItem = new MockDownloadItem(
      'https://example.com'
    ) as Electron.DownloadItem
    mockDownloadItem.setSavePath('/tmp/example.txt')
    expect(mockDownloadItem.getSavePath()).to.equal('/tmp/example.txt')
  })
})
