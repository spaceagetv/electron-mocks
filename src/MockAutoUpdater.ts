import { AutoUpdater } from 'electron'
import * as sinon from 'sinon'
import { EventEmitter } from 'events'

export class MockAutoUpdater extends EventEmitter implements AutoUpdater {
  _feedURL: string
  _headers: Record<string, string>
  _serverType: string

  checkForUpdates = sinon.spy()
  quitAndInstall = sinon.spy()

  setFeedURL = sinon.spy(({ url, headers, serverType }) => {
    this._feedURL = url
    this._headers = headers
    this._serverType = serverType
  })

  getFeedURL() {
    return this._feedURL
  }
}
