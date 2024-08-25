import { DownloadItem } from 'electron'
import * as sinon from 'sinon'
import { EventEmitter } from 'events'

// https://www.electronjs.org/docs/latest/api/download-item

export class MockDownloadItem extends EventEmitter implements DownloadItem {
  _filename: string
  _URL: string
  savePath = ''
  _receivedBytes = 0
  _totalBytes = 1000
  _state: 'completed' | 'cancelled' | 'interrupted' | 'progressing' =
    'completed'
  _canResume = true
  _isPaused = false

  cancel = sinon.spy()
  canResume = sinon.spy()
  getContentDisposition = sinon.spy(() => '')
  getETag = sinon.spy(() => '')
  getFilename = sinon.spy(() => this._filename)
  getLastModifiedTime = sinon.spy(() => '')
  getMimeType = sinon.spy(() => '')
  getReceivedBytes = sinon.spy(() => this._receivedBytes)
  getSavePath = sinon.spy(() => this.savePath)
  getStartTime = sinon.spy(() => Date.now())
  getState = sinon.spy(() => this._state)
  getTotalBytes = sinon.spy(() => this._totalBytes)
  getURL = sinon.spy(() => this._URL)
  getURLChain = sinon.spy(() => [this._URL])
  hasUserGesture = sinon.spy(() => false)
  isPaused = sinon.spy(() => this._isPaused)
  pause = sinon.spy(() => {
    this._isPaused = true
  })
  resume = sinon.spy(() => {
    this._isPaused = false
  })
  setSaveDialogOptions = sinon.spy()
  getSaveDialogOptions = sinon.spy(() => ({}))
  setSavePath = sinon.spy((path: string) => {
    this.savePath = path
  })

  // for Electron 32 update
  getCurrentBytesPerSecond = sinon.spy(() => 100)
  getEndTime = sinon.spy(() => Date.now() + 5000)
  getPercentComplete = sinon.spy(() => this._receivedBytes / this._totalBytes)

  constructor(url: string) {
    super()
    this._URL = url
    this._filename = url.split('?')[0].split('/').pop() || ''
  }
}
