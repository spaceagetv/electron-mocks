import sinon from 'sinon'
import { BrowserWindow, WebContents, nativeImage } from 'electron'
import EventEmitter from 'events'
import { MockWebContents } from './MockWebContents'

let nextId = 1

export class MockBrowserWindow extends EventEmitter implements BrowserWindow {
  webContents: Electron.WebContents

  // static properties
  static getAllWindows = sinon.spy(() => [])
  static getFocusedWindow = sinon.spy(() => null)
  static fromWebContents = sinon.spy(() => null)
  static fromBrowserView = sinon.spy(() => null)
  static fromId = sinon.spy(() => null)

  // properties
  id = nextId++
  autoHideMenuBar = false
  simpleFullScreen = false
  fullScreen = false
  focusable = true
  visibleOnAllWorkspaces = false
  shadow = true
  menuBarVisible = true
  kiosk = false
  documentEdited = false
  representedFilename = ''
  get title() {
    return this._title
  }
  set title(value: string) {
    const event = new Event('page-title-updated', { cancelable: true })
    this.emit('page-title-updated', event, value)
    if (event.defaultPrevented) return
    this._title = value
  }
  minimizable = true
  maximizable = true
  fullScreenable = true
  resizable = true
  closable = true
  movable = true
  excludedFromShownWindowsMenu = false
  accessibleTitle = ''

  private _destroyed = false
  private _focused = this.focusable ? true : false
  private _visible = true
  private _maximized = false
  private _minimized = false
  private _fullscreen = false
  private _simpleFullscreen = false
  private _bounds = {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  }
  private _backgroundColor = '#FFFFFF'
  private _titleBarHeight = 22
  private _enabled = true
  private _hiddenInMissionControl = false
  private _alwaysOnTop = false
  private _representedFilename = ''
  private _documentEdited = false
  private _opacity = 1
  private _visibleOnAllWorkspaces = false
  private _parent = null as BrowserWindow
  private _childWindows = [] as BrowserWindow[]
  private _title = ''
  private _modal = false
  private _skipTaskbar = false

  // methods
  destroy = sinon.spy(() => {
    this._destroyed = true
    this.emit('closed')
  })
  close = sinon.spy(() => {
    const closeEvent = new Event('close', { cancelable: true })
    this.emit('close', closeEvent)
    if (closeEvent.defaultPrevented) return
    this.destroy()
  })
  focus = sinon.spy(() => {
    if (this.focusable && !this._focused) {
      this._focused = true
      this.emit('focus')
    }
  })
  blur = sinon.spy(() => {
    if (this.focusable && this._focused) {
      this._focused = false
      this.emit('blur')
    }
  })
  isFocused = sinon.spy(() => this._focused)
  isDestroyed = sinon.spy(() => this._destroyed)
  show = sinon.spy(() => {
    this.emit('show')
    this._visible = true
    this.focus()
  })
  showInactive = sinon.spy(() => {
    this.emit('show')
  })
  hide = sinon.spy(() => {
    this.emit('hide')
    this._visible = false
    this.blur()
  })
  isVisible = sinon.spy(() => this._visible)
  isModal = sinon.spy(() => this._modal)
  maximize = sinon.spy(() => {
    if (!this.maximizable || this._maximized) return
    this.restore()
    this._maximized = true
    this.emit('maximize')
  })
  unmaximize = sinon.spy(() => {
    if (!this._maximized) return
    this._maximized = false
    this.emit('unmaximize')
  })
  isMaximized = sinon.spy(() => this._maximized)
  minimize = sinon.spy(() => {
    if (!this.minimizable || this._minimized) return
    this._minimized = true
    this.emit('minimize')
  })
  restore = sinon.spy(() => {
    if (!this._minimized) return
    this._minimized = false
    this.emit('restore')
  })
  isMinimized = sinon.spy(() => this._minimized)

  setFullScreen = sinon.spy((flag: boolean) => {
    if (!this.fullScreenable) return
    if (flag === this._fullscreen) return
    this._fullscreen = flag
    if (flag) {
      this.emit('enter-full-screen')
    } else {
      this.emit('leave-full-screen')
    }
  })
  isFullScreen = sinon.spy(() => this._fullscreen)
  setSimpleFullScreen = sinon.spy((flag: boolean) => {
    if (!this.fullScreenable) return
    if (flag === this._simpleFullscreen) return
    this._simpleFullscreen = flag
    if (flag) {
      this.emit('enter-full-screen')
    } else {
      this.emit('leave-full-screen')
    }
  })
  isSimpleFullScreen = sinon.spy(() => this._simpleFullscreen)
  isNormal = sinon.spy(
    () => !this._fullscreen && !this._minimized && !this._maximized,
  )
  setAspectRatio = sinon.spy()
  setBackgroundColor = sinon.spy((color: string) => {
    this._backgroundColor = color
  })
  previewFile = sinon.spy()
  closeFilePreview = sinon.spy()
  setBounds = sinon.spy((bounds: Partial<Electron.Rectangle>) => {
    if (
      bounds.x === this._bounds.x &&
      bounds.y === this._bounds.y &&
      bounds.width === this._bounds.width &&
      bounds.height === this._bounds.height
    ) {
      return
    }
    // will resize
    const resizeEvent = new Event('resize', { cancelable: true })
    this.emit('resize', resizeEvent, bounds)
    if (resizeEvent.defaultPrevented) return
    const moveEvent = new Event('will-move', { cancelable: true })
    this.emit('will-move', moveEvent)
    if (moveEvent.defaultPrevented) return
    Object.assign(this._bounds, bounds)
    this.emit('resized')
    this.emit('move')
    this.emit('moved')
  })
  getBounds = sinon.spy(() => {
    return { ...this._bounds }
  })
  getBackgroundColor = sinon.spy(() => this._backgroundColor)
  setContentBounds = sinon.spy((bounds: Partial<Electron.Rectangle>) => {
    // set bounds offset by menu bar height
    this.setBounds({
      x: bounds.x,
      y: bounds.y - this._titleBarHeight,
      width: bounds.width,
      height: bounds.height + this._titleBarHeight,
    })
  })
  getContentBounds = sinon.spy(() => {
    const { x, y, width, height } = this._bounds
    return {
      x,
      y: y + this._titleBarHeight,
      width,
      height: height - this._titleBarHeight,
    }
  })
  getNormalBounds = sinon.spy(() => {
    return { ...this._bounds }
  })
  setEnabled = sinon.spy((enabled: boolean) => {
    this._enabled = enabled
  })
  isEnabled = sinon.spy(() => this._enabled)
  setSize = sinon.spy((width: number, height: number) => {
    this.setBounds({ width, height })
  })
  getSize = sinon.spy(() => {
    const { width, height } = this._bounds
    return [width, height]
  })
  setContentSize = sinon.spy((width: number, height: number) => {
    this.setContentBounds({ width, height })
  })
  getContentSize = sinon.spy(() => {
    const { width, height } = this.getContentBounds()
    return [width, height]
  })
  setMinimumSize = sinon.spy()
  getMinimumSize = sinon.spy(() => [0, 0])
  setMaximumSize = sinon.spy()
  getMaximumSize = sinon.spy(() => [0, 0])
  setResizable = sinon.spy((resizable: boolean) => {
    this.resizable = resizable
  })
  isResizable = sinon.spy(() => this.resizable)
  setMovable = sinon.spy((movable: boolean) => {
    this.movable = movable
  })
  isMovable = sinon.spy(() => this.movable)
  setMinimizable = sinon.spy((minimizable: boolean) => {
    this.minimizable = minimizable
  })
  isMinimizable = sinon.spy(() => this.minimizable)
  setMaximizable = sinon.spy((maximizable: boolean) => {
    this.maximizable = maximizable
  })
  isMaximizable = sinon.spy(() => this.maximizable)
  setFullScreenable = sinon.spy((fullScreenable: boolean) => {
    this.fullScreenable = fullScreenable
  })
  isFullScreenable = sinon.spy(() => this.fullScreenable)
  setClosable = sinon.spy((closable: boolean) => {
    this.closable = closable
  })
  isClosable = sinon.spy(() => this.closable)
  setHiddenInMissionControl = sinon.spy((hidden: boolean) => {
    this._hiddenInMissionControl = hidden
  })
  isHiddenInMissionControl = sinon.spy(() => this._hiddenInMissionControl)
  setAlwaysOnTop = sinon.spy((flag: boolean) => {
    this._alwaysOnTop = flag
  })
  isAlwaysOnTop = sinon.spy(() => this._alwaysOnTop)
  moveAbove = sinon.spy()
  moveTop = sinon.spy()
  center = sinon.spy()
  setPosition = sinon.spy((x: number, y: number) => {
    this.setBounds({ x, y })
  })
  getPosition = sinon.spy(() => {
    const { x, y } = this._bounds
    return [x, y]
  })
  setTitle = sinon.spy((title: string) => {
    this.title = title
  })
  getTitle = sinon.spy(() => this.title)
  setSheetOffset = sinon.spy()
  flashFrame = sinon.spy()
  setSkipTaskbar = sinon.spy()
  setKiosk = sinon.spy((flag: boolean) => {
    this.kiosk = flag
  })
  isKiosk = sinon.spy(() => this.kiosk)
  isTabletMode = sinon.spy(() => false)
  getMediaSourceId = sinon.spy(() => 'window:1234:0')
  getNativeWindowHandle = sinon.spy(() => Buffer.from('window:1234:0'))
  hookWindowMessage = sinon.spy()
  isWindowMessageHooked = sinon.spy(() => false)
  unhookWindowMessage = sinon.spy()
  unhookAllWindowMessages = sinon.spy()
  setRepresentedFilename = sinon.spy((filename: string) => {
    this._representedFilename = filename
  })
  getRepresentedFilename = sinon.spy(() => this._representedFilename)
  setDocumentEdited = sinon.spy((edited: boolean) => {
    this._documentEdited = edited
  })
  isDocumentEdited = sinon.spy(() => this._documentEdited)
  focusOnWebView = sinon.spy()
  blurWebView = sinon.spy()
  capturePage = sinon.spy(async () => {
    return nativeImage.createEmpty()
  })
  loadURL = sinon.spy((url: string) => {
    return this.webContents.loadURL(url)
  })
  loadFile = sinon.spy((filePath: string) => {
    return this.webContents.loadFile(filePath)
  })
  reload = sinon.spy(() => {
    this.webContents.reload()
  })
  setMenu = sinon.spy()
  removeMenu = sinon.spy()
  setProgressBar = sinon.spy()
  setOverlayIcon = sinon.spy()
  setHasShadow = sinon.spy((hasShadow: boolean) => {
    this.shadow = hasShadow
  })
  hasShadow = sinon.spy(() => this.shadow)
  invalidateShadow = sinon.spy()
  setOpacity = sinon.spy((opacity: number) => {
    this._opacity = opacity
  })
  getOpacity = sinon.spy(() => this._opacity)
  setShape = sinon.spy()
  setThumbarButtons = sinon.spy()
  setThumbnailClip = sinon.spy()
  setThumbnailToolTip = sinon.spy()
  setAppDetails = sinon.spy()
  showDefinitionForSelection = sinon.spy()
  setIcon = sinon.spy()
  setWindowButtonVisibility = sinon.spy()
  setAutoHideMenuBar = sinon.spy((autoHide: boolean) => {
    this.autoHideMenuBar = autoHide
  })
  isMenuBarAutoHide = sinon.spy(() => this.autoHideMenuBar)
  setMenuBarVisibility = sinon.spy((visible: boolean) => {
    this.menuBarVisible = visible
  })
  isMenuBarVisible = sinon.spy(() => this.menuBarVisible)
  setVisibleOnAllWorkspaces = sinon.spy((visible: boolean) => {
    this._visibleOnAllWorkspaces = visible
  })
  isVisibleOnAllWorkspaces = sinon.spy(() => this._visibleOnAllWorkspaces)
  setIgnoreMouseEvents = sinon.spy()
  setContentProtection = sinon.spy()
  setFocusable = sinon.spy((focusable: boolean) => {
    this.focusable = focusable
  })
  isFocusable = sinon.spy(() => this.focusable)
  setParentWindow = sinon.spy((parent: BrowserWindow) => {
    this._parent = parent
  })
  getParentWindow = sinon.spy(() => this._parent)
  setChildWindows = sinon.spy((children: BrowserWindow[]) => {
    this._childWindows = children
  })
  getChildWindows = sinon.spy(() => this._childWindows)
  setAutoHideCursor = sinon.spy()
  selectPreviousTab = sinon.spy()
  selectNextTab = sinon.spy()
  mergeAllWindows = sinon.spy()
  moveTabToNewWindow = sinon.spy()
  toggleTabBar = sinon.spy()
  addTabbedWindow = sinon.spy()
  setVibrancy = sinon.spy()
  setTrafficLightPosition = sinon.spy()
  getTrafficLightPosition = sinon.spy(() => {
    return { x: 0, y: 0 }
  })
  setTouchBar = sinon.spy()
  setBrowserView = sinon.spy()
  getBrowserView = sinon.spy(() => null)
  addBrowserView = sinon.spy()
  removeBrowserView = sinon.spy()
  setTopBrowserView = sinon.spy()
  getBrowserViews = sinon.spy(() => [])
  setTitleBarOverlay = sinon.spy()

  // new in Electron 25
  getWindowButtonPosition = sinon.spy()
  setWindowButtonPosition = sinon.spy()
  setBackgroundMaterial = sinon.spy()

  private _options: Electron.BrowserWindowConstructorOptions = {}
  constructor(options: Electron.BrowserWindowConstructorOptions = {}) {
    super()
    this.webContents = new MockWebContents(
      options.webPreferences,
    ) as unknown as WebContents

    this.webContents.on('did-finish-load', () => {
      if (!this || this.isDestroyed() || this._visible) return
      this.emit('ready-to-show')
    })

    Object.assign(this._options, options)
    this.title = options.title || ''

    this._backgroundColor = options.backgroundColor || this._backgroundColor
    const { x = 0, y = 0, width = 600, height = 800 } = options
    Object.assign(this._bounds, { x, y, width, height })

    if (options.simpleFullscreen !== undefined)
      this.simpleFullScreen = options.simpleFullscreen

    if (options.hasShadow !== undefined) this.shadow = options.hasShadow

    if (options.autoHideMenuBar !== undefined)
      this.autoHideMenuBar = options.autoHideMenuBar

    this.focusable = options.focusable !== undefined ? options.focusable : true

    this._visible = options.show !== undefined ? options.show : this._visible
    this._modal = options.modal !== undefined ? options.modal : this._modal
    this.maximizable =
      options.maximizable !== undefined ? options.maximizable : this.maximizable
    this.minimizable =
      options.minimizable !== undefined ? options.minimizable : this.minimizable
    this.closable =
      options.closable !== undefined ? options.closable : this.closable
    this.resizable =
      options.resizable !== undefined ? options.resizable : this.resizable
    this.fullScreenable =
      options.fullscreenable !== undefined
        ? options.fullscreenable
        : this.fullScreenable
    this.movable =
      options.movable !== undefined ? options.movable : this.movable
    this._alwaysOnTop =
      options.alwaysOnTop !== undefined
        ? options.alwaysOnTop
        : this._alwaysOnTop
    this._skipTaskbar =
      options.skipTaskbar !== undefined
        ? options.skipTaskbar
        : this._skipTaskbar
    this.kiosk = options.kiosk !== undefined ? options.kiosk : this.kiosk

    // emit events on next tick
    setTimeout(() => {
      if (!this || this.isDestroyed() || this._visible) return
      this.emit('ready-to-show')
      if (this._visible) this.emit('show')
    })
  }
}
