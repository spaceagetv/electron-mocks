# electron-mocks

[![npm](https://img.shields.io/npm/v/electron-mocks.svg)](https://www.npmjs.com/package/electron-mocks)
[![GitHub release](https://img.shields.io/github/release/spaceagetv/electron-mocks.svg)](https://github.com/spaceagetv/electron-mocks/releases)
[![npm](https://img.shields.io/npm/dm/electron-mocks)](https://www.npmjs.com/package/electron-mocks)
[![NPM](https://img.shields.io/npm/l/electron-mocks)](/LICENSE.txt)

Mock classes for Electron.

This library is a collection of mocked classes to replace various Electron classes and instances during testing.

## Installation

```bash
npm install --save-dev electron-mocks
```

## Details

It's still very rough, so please help contribute to help make this functionality more robust.

Currently implemented:

- [MockBrowserWindow](src/MockBrowserWindow.ts)
- [MockWebContents](src/MockWebContents.ts)
- [MockView](src/MockView.ts)
- [MockIpcMain](src/MockIpcMain.ts)
- [MockIpcRenderer](src/MockIpcRenderer.ts)
- [MockDialog](src/MockDialog.ts)
- [MockScreen](src/MockScreen.ts)
- [MockDisplay](src/MockDisplay.ts)
- [MockAutoUpdater](src/MockAutoUpdater.ts)
- [MockDownloadItem](src/MockDownloadItem.ts)

All methods are implemented and should return logical values. Additionally, methods are wrapped in [sinon.spy()]([url](https://sinonjs.org/releases/latest/spies/)) so calls can be queried. All logical events should be emitted.

We're using TypeScript's [`implements`](https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses) clauses to ensure that the mocked classes have the same public interface as the classes they're replacing. This means that you should be able to use the mocked classes in place of the real ones without any issues.

## Usage

Each class has most/all of its methods stubbed so that you can do things like:

```JS
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
```

More/better examples in the [test/examples](test/examples) directory.

## Contributing

Please help contribute to this project! Try to adhere to conventional commit syntax, and run `npm run lint` before submitting a PR. If you're not sure how to contribute, please open an issue and we can discuss it.

## License

MIT

## Pros/Cons and Alternatives

### Pros

- Tests run fast. No need to spin up a real Electron instance.
- No need to mock out IPC calls
- Test GUI functionality without the overhead of a real Electron instance
- All methods are already spied on, so you can easily assert that they were called

### Cons

- Requires swapping your normal classes and instances (`BrowserWindow`, `ipcMain`, `screen`, etc) with mocks for testing – although theoretically, you might be able to do this "automatically" with [proxyquire](https://www.npmjs.com/package/proxyquire).
- Not a real Electron instance, so some functionality may be missing
- Not a real Electron instance, so some functionality may be different
- Not a real Electron instance, so some functionality may be buggy

### Alternatives

- [electron-mocha](https://github.com/jprichardson/electron-mocha) - Allows you to run your tests in Electron, but you still need to mock out IPC calls and spin up a real Electron instance. FWIW, you can use `electron-mocks` with `electron-mocha` to get the best of both worlds.
- [electron-mock-ipc](https://github.com/h3poteto/electron-mock-ipc) - Mocks out Electron ipc calls. Does not rely on sinon. ipcMain and ipcRenderer communicate with one another. Again, you can mix and match this with `electron-mocks` if you want.
