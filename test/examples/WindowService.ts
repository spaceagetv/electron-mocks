// WindowsService.ts

import {
  BrowserWindow,
  Screen,
  screen,
  IpcMain,
  ipcMain,
  Dialog,
  dialog,
} from 'electron'

/**
 * Testable service for creating BrowserWindows in our app,
 * with mockable dependencies.
 */
export class WindowService {
  _WindowClass: typeof BrowserWindow
  _screenInstance: Screen
  _ipcMainInstance: IpcMain
  _dialogInstance: Dialog

  constructor(
    WindowClass: typeof BrowserWindow,
    screenInstance: Screen,
    ipcMainInstance: IpcMain,
    dialogInstance: Dialog,
  ) {
    this._WindowClass = WindowClass
    this._screenInstance = screenInstance
    this._ipcMainInstance = ipcMainInstance
    this._dialogInstance = dialogInstance
  }

  createWindow(): BrowserWindow {
    const screenRect = this._screenInstance.getPrimaryDisplay().workArea

    // 1/2 screen width, 1/2 screen height, centered on primary display
    const windowRect = {
      x: Math.round(screenRect.x + screenRect.width / 4),
      y: Math.round(screenRect.y + screenRect.height / 4),
      width: Math.round(screenRect.width / 2),
      height: Math.round(screenRect.height / 2),
    }

    const win = new this._WindowClass({
      ...windowRect,
      title: 'Main Window',
      show: false,
      webPreferences: {
        nodeIntegration: true,
      },
    })

    win.loadFile('index.html')

    win.once('ready-to-show', () => {
      win.show()
    })

    win.on('close', async (e) => {
      e.preventDefault()
      const { response } = await this._dialogInstance.showMessageBox(win, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'Are you sure you want to quit?',
      })
      if (response === 0) {
        win.destroy()
      }
    })

    // See: https://github.com/electron/electron/issues/38560
    win.webContents.ipc.handle('get-state', async () => {
      return {
        rock: '🤘',
        roll: '🍩',
      }
    })

    return win
  }
}

/** Default WindowService instance */
export const windowService = new WindowService(
  BrowserWindow,
  screen,
  ipcMain,
  dialog,
)

export default windowService
