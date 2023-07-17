// WindowService.test.ts

import {
  MockBrowserWindow,
  MockDisplay,
  MockIpcMain,
  MockScreen,
  MockDialog,
} from '../../src' // <-- replace with 'electron-mocks'
import { expect } from 'chai'
import sinon from 'sinon'
import { WindowService } from './WindowService'

describe('WindowService', () => {
  let primaryDisplay: MockDisplay
  let screenMock: MockScreen
  let ipcMainMock: MockIpcMain
  let dialogMock: MockDialog
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
    dialogMock = new MockDialog()
    windowService = new WindowService(
      MockBrowserWindow,
      screenMock,
      ipcMainMock,
      dialogMock
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

    it('calls dialog when closing the window', async () => {
      // mock the response from the dialog
      dialogMock.showMessageBox.resolves({
        response: 0, // the "Yes" button
        checkboxChecked: false,
      } as Electron.MessageBoxReturnValue)

      const browserWindow = windowService.createWindow()

      browserWindow.close()

      // wait async events to resolve
      await Promise.resolve()

      sinon.assert.calledOnceWithExactly(
        dialogMock.showMessageBox as sinon.SinonSpy,
        browserWindow,
        {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Are you sure you want to quit?',
        }
      )
      sinon.assert.calledOnce(browserWindow.destroy as sinon.SinonSpy)
      expect(browserWindow.isDestroyed()).to.be.true
    })

    it('does not close the window when dialog response is not 0', async () => {
      // mock the response from the dialog
      dialogMock.showMessageBox.resolves({
        response: 1, // the "No" button
        checkboxChecked: false,
      } as Electron.MessageBoxReturnValue)

      const browserWindow = windowService.createWindow()

      browserWindow.close()

      // wait async events to resolve
      await Promise.resolve()

      sinon.assert.calledOnceWithExactly(
        dialogMock.showMessageBox as sinon.SinonSpy,
        browserWindow,
        {
          type: 'question',
          buttons: ['Yes', 'No'],
          title: 'Confirm',
          message: 'Are you sure you want to quit?',
        }
      )
      sinon.assert.notCalled(browserWindow.destroy as sinon.SinonSpy)
      expect(browserWindow.isDestroyed()).to.be.false
    })
  })
})
