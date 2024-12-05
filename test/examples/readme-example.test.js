/* eslint-disable @typescript-eslint/no-require-imports */
const { describe, it } = require('mocha')
const { expect, assert } = require('chai')
const { BrowserWindow } = require('electron')
const { MockBrowserWindow } = require('electron-mocks')
const sinon = require('sinon')

function createWindow(mock = false) {
  const BrowserWindowConstructor = mock ? MockBrowserWindow : BrowserWindow
  const win = new BrowserWindowConstructor({
    width: 840,
    height: 620,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  win.webContents.loadURL('https://github.com')
  win.on('ready-to-show', () => {
    win.show()
    win.webContents.send('Hello Window!', true)
  })
  return win
}

describe('electron-mocks example', () => {
  it('should create a BrowserWindow', async () => {
    const win = createWindow(true)
    assert(!win.isVisible(), 'window should not be visible until ready-to-show')
    await new Promise((resolve) => win.on('ready-to-show', resolve))
    expect(win).to.be.instanceOf(MockBrowserWindow)
    const bounds = win.getBounds()
    assert(bounds.width === 840)
    assert(bounds.height === 620)
    assert(win.isVisible(), 'window should be visible after ready-to-show')
    sinon.assert.calledOnce(win.webContents.loadURL)
    sinon.assert.calledOnce(win.webContents.send)
    sinon.assert.calledWith(win.webContents.send, 'Hello Window!', true)
  })
})
