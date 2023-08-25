import { Debugger, Session, WebContents, WebFrame } from 'electron'
import EventEmitter from 'events'
import sinon from 'sinon'
import { MockIpcMain } from './MockIpcMain'

let nextId = 1

export class MockWebContents extends EventEmitter implements WebContents {
  // properties
  id = nextId++
  audioMuted = false
  userAgent = ''
  zoomLevel = 0
  zoomFactor = 1
  frameRate = 60
  backgroundThrottling = false

  readonly session = null as Session
  readonly hostWebContents = null as WebContents
  readonly devToolsWebContents = null as WebContents
  readonly debugger = null as Debugger
  // electron doesn't seem to be exporting WebFrameMain
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  readonly mainFrame = null as WebFrame

  // private properties
  private _url = ''
  private _title = ''
  private _destroyed = false
  private _focused = true
  private _muted = false

  // methods
  loadURL = sinon.spy((url: string) => {
    this._url = url
    this.emit('did-start-loading')
    this.emit('did-stop-loading')
    this.emit('dom-ready')
    this.emit('did-finish-load')
    return Promise.resolve()
  })
  loadFile = sinon.spy((filePath: string) => {
    const url = `file://${filePath}`
    return this.loadURL(url)
  })
  downloadURL = sinon.spy(() => {
    // this.session.emit('will-download', { url })
    return Promise.resolve()
  })
  getURL = sinon.spy(() => this._url)
  getTitle = sinon.spy(() => this._title)
  isDestroyed = sinon.spy(() => this._destroyed)
  close = sinon.spy(() => {
    this._destroyed = true
  })
  focus = sinon.spy(() => {
    this._focused = true
  })
  isFocused = sinon.spy(() => this._focused)
  isLoading = sinon.spy(() => false)
  isLoadingMainFrame = sinon.spy(() => false)
  isWaitingForResponse = sinon.spy(() => false)
  stop = sinon.spy()
  reload = sinon.spy(() => this.loadURL(this._url))
  reloadIgnoringCache = sinon.spy(() => this.loadURL(this._url))
  canGoBack = sinon.spy(() => false)
  canGoForward = sinon.spy(() => false)
  canGoToOffset = sinon.spy(() => false)
  clearHistory = sinon.spy()
  goBack = sinon.spy()
  goForward = sinon.spy()
  goToIndex = sinon.spy()
  goToOffset = sinon.spy()
  isCrashed = sinon.spy(() => false)
  forcefullyCrashRenderer = sinon.spy()
  setUserAgent = sinon.spy((userAgent: string) => {
    this.userAgent = userAgent
  })
  getUserAgent = sinon.spy(() => this.userAgent)
  insertCSS = sinon.spy()
  removeInsertedCSS = sinon.spy()
  executeJavaScript = sinon.spy()
  executeJavaScriptInIsolatedWorld = sinon.spy()
  setIgnoreMenuShortcuts = sinon.spy()
  setWindowOpenHandler = sinon.spy()
  setAudioMuted = sinon.spy((muted: boolean) => {
    this._muted = muted
  })
  isAudioMuted = sinon.spy(() => this._muted)
  isCurrentlyAudible = sinon.spy(() => false)
  setZoomFactor = sinon.spy((zoomFactor: number) => {
    this.zoomFactor = zoomFactor
    this.emit('zoom-changed')
  })
  setZoomLevel = sinon.spy((zoomLevel: number) => {
    this.zoomLevel = zoomLevel
  })
  getZoomFactor = sinon.spy(() => this.zoomFactor)
  getZoomLevel = sinon.spy(() => this.zoomLevel)
  setVisualZoomLevelLimits = sinon.spy()
  undo = sinon.spy()
  redo = sinon.spy()
  cut = sinon.spy()
  copy = sinon.spy()
  copyImageAt = sinon.spy()
  paste = sinon.spy()
  pasteAndMatchStyle = sinon.spy()
  delete = sinon.spy()
  selectAll = sinon.spy()
  unselect = sinon.spy()
  replace = sinon.spy()
  replaceMisspelling = sinon.spy()
  insertText = sinon.spy()
  findInPage = sinon.spy()
  stopFindInPage = sinon.spy()
  capturePage = sinon.spy()
  isBeingCaptured = sinon.spy(() => false)
  incrementCapturerCount = sinon.spy()
  decrementCapturerCount = sinon.spy()
  getPrinters = sinon.spy(() => [])
  getPrintersAsync = sinon.spy(() => Promise.resolve([]))
  print = sinon.spy()
  printToPDF = sinon.spy()
  addWorkSpace = sinon.spy()
  removeWorkSpace = sinon.spy()
  setDevToolsWebContents = sinon.spy()
  openDevTools = sinon.spy()
  closeDevTools = sinon.spy()
  isDevToolsOpened = sinon.spy(() => false)
  isDevToolsFocused = sinon.spy(() => false)
  toggleDevTools = sinon.spy()
  inspectElement = sinon.spy()
  inspectSharedWorker = sinon.spy()
  inspectSharedWorkerById = sinon.spy()
  getAllSharedWorkers = sinon.spy(() => [])
  inspectServiceWorker = sinon.spy()
  send = sinon.spy()
  sendToFrame = sinon.spy()
  postMessage = sinon.spy()
  enableDeviceEmulation = sinon.spy()
  disableDeviceEmulation = sinon.spy()
  sendInputEvent = sinon.spy()
  beginFrameSubscription = sinon.spy()
  endFrameSubscription = sinon.spy()
  startDrag = sinon.spy()
  savePage = sinon.spy()
  showDefinitionForSelection = sinon.spy()
  isOffscreen = sinon.spy(() => false)
  startPainting = sinon.spy()
  stopPainting = sinon.spy()
  isPainting = sinon.spy(() => false)
  setFrameRate = sinon.spy()
  getFrameRate = sinon.spy(() => 60)
  invalidate = sinon.spy()
  getWebRTCIPHandlingPolicy = sinon.spy(() => 'default_public_interface_only')
  setWebRTCIPHandlingPolicy = sinon.spy()
  getMediaSourceId = sinon.spy(() => '')
  getOSProcessId = sinon.spy(() => 0)
  getProcessId = sinon.spy(() => 0)
  takeHeapSnapshot = sinon.spy()
  setBackgroundThrottling = sinon.spy((throttling: boolean) => {
    this.backgroundThrottling = throttling
  })
  getBackgroundThrottling = sinon.spy(() => this.backgroundThrottling)
  getType = sinon.spy(
    () =>
      'window' as
        | 'window'
        | 'backgroundPage'
        | 'browserView'
        | 'remote'
        | 'webview'
        | 'offscreen',
  )
  setImageAnimationPolicy = sinon.spy()

  ipc = new MockIpcMain() as Electron.IpcMain

  constructor(options = {} as Electron.WebPreferences) {
    super()
    this.zoomFactor = options.zoomFactor || this.zoomFactor
  }
}
