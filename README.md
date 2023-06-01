# electron-mocks

Mock various Electron classes for testing

This library is a collection of mocked classes to replace various Electron classes and instances during testing. 

It's still very rough, so please help contribute to help make this functionality more robust.

Currently implemented:
- [MockBrowserWindow](src/MockBrowserWindow.ts)
- [MockWebContents](src/MockWebContents.ts)
- [MockIpcMain](src/MockIpcMain.ts)
- [MockIpcRenderer](src/MockIpcRenderer.ts)
- [MockScreen](src/MockScreen.ts)
- [MockDisplay](src/MockDisplay.ts)

All methods are implemented and should return logical values. Additionally, methods are wrapped in [sinon.spy()]([url](https://sinonjs.org/releases/latest/spies/)) so calls can be queried. All logical events should be emitted.

Each class has most/all of its methods stubbed so that you can do things like:

```JS
async function createWindow(testing) {
  const Bw = testing ? MockBrowserWindow : BrowserWindow
  const win = new Bw({
    width: 500,
    height: 300,
  })
  await win.loadFile('/path/to/file')
  win.on('ready-to-show', () => {
    win.show()
    win.webContents.send('Hello Window!')
  })
  
  return win
}

//...elsewhere

it('BrowserWindow should function correctly', async () => {
  const win = await createBrowserWindow(true)
  const bounds = win.getBounds()
  assert(bounds.width === 500)
  assert(bounds.height === 300)
  sinon.assert(win.webContents.loadURL.calledOnce())
  sinon.assert(win.webContents.send.calledOnce())
  sinon.assert(win.webContents.send.calledWith('Hello Window!')
})

```

