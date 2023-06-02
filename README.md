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
- [MockIpcMain](src/MockIpcMain.ts)
- [MockIpcRenderer](src/MockIpcRenderer.ts)
- [MockScreen](src/MockScreen.ts)
- [MockDisplay](src/MockDisplay.ts)

All methods are implemented and should return logical values. Additionally, methods are wrapped in [sinon.spy()]([url](https://sinonjs.org/releases/latest/spies/)) so calls can be queried. All logical events should be emitted.

We're using TypeScript's [`implements`](https://www.typescriptlang.org/docs/handbook/2/classes.html#implements-clauses) clauses to ensure that the mocked classes have the same public interface as the classes they're replacing. This means that you should be able to use the mocked classes in place of the real ones without any issues.

## Usage

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

More/better examples in the [tests/examples](tests/examples) directory.

## Contributing

Please help contribute to this project! Try to adhere to conventional commit syntax, and run `npm run lint` before submitting a PR. If you're not sure how to contribute, please open an issue and we can discuss it.

## License

MIT

## Pros/Cons and Alternatives

### Pros

- No need to spin up a real Electron instance
- No need to mock out IPC calls
- Test GUI functionality without the overhead of a real Electron instance
- Tests run fast
- All methods are already spied on, so you can easily assert that they were called

### Cons

- Not a real Electron instance, so some functionality may be missing
- Not a real Electron instance, so some functionality may be different
- Not a real Electron instance, so some functionality may be buggy

### Alternatives

- [electron-mocha](https://github.com/jprichardson/electron-mocha) - Allows you to run your tests in Electron, but you still need to mock out IPC calls and spin up a real Electron instance
- [electron-mock-ipc](https://github.com/h3poteto/electron-mock-ipc) - Mocks out Electron ipc calls. Does not rely on sinon. ipcMain and ipcRenderer communicate with one another.

