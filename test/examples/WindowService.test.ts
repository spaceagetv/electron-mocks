// WindowService.test.ts

import {
  MockBrowserWindow,
  MockDisplay,
  MockIpcMain,
  MockScreen,
} from '../../src' // <-- replace with 'electron-mocks'
import { expect } from 'chai'
import sinon from 'sinon'
import { WindowService } from './WindowService'

describe('WindowService', () => {
  let primaryDisplay: MockDisplay
  let screenMock: MockScreen
  let ipcMainMock: MockIpcMain
  let windowService: WindowService

  beforeEach(() => {
    primaryDisplay = new MockDisplay({
      bounds: {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080,
      },
    })
    screenMock = new MockScreen([primaryDisplay])
    ipcMainMock = new MockIpcMain()
    windowService = new WindowService(
      MockBrowserWindow,
      screenMock,
      ipcMainMock
    )
  })

  describe('createWindow', () => {
    it('creates a BrowserWindow', () => {
      const browserWindow = windowService.createWindow()

      expect(browserWindow).to.be.an.instanceOf(MockBrowserWindow)
      const bounds = browserWindow.getBounds()
      expect(bounds).to.deep.equal({
        x: 480,
        y: 293,
        width: 960,
        height: 525,
      })

      expect(browserWindow.title).to.equal('Main Window')

      sinon.assert.calledOnceWithExactly(
        browserWindow.webContents.loadFile as sinon.SinonSpy,
        'index.html'
      )
      sinon.assert.calledOnceWithExactly(
        browserWindow.webContents.ipc.handle as sinon.SinonSpy,
        'get-state',
        sinon.match.func
      )
    })
  })
})
