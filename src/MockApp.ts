import { EventEmitter } from 'events'
import sinon from 'sinon'

export class MockApp extends EventEmitter implements Electron.App {
  quit = sinon.spy()
  exit = sinon.spy()
  relaunch = sinon.spy()
  isReady = sinon.spy(() => true)
  whenReady = sinon.spy(() => Promise.resolve())
  focus = sinon.spy()
  hide = sinon.spy()
  isHidden = sinon.spy(() => false)
  show = sinon.spy()
  setAppLogsPath = sinon.spy()
  getAppPath = sinon.spy(() => '/path/to/app')
  getPath = sinon.spy((name: string) => `/path/to/${name}`)
  // @todo: create a NativeImage mock and return it here
  getFileIcon = sinon.spy(() => Promise.resolve(null))
  setPath = sinon.spy()
  getVersion = sinon.spy(() => '1.0.0')
  getName = sinon.spy(() => 'MockApp')
  setName = sinon.spy()
  getLocale = sinon.spy(() => 'en-US')
  getLocaleCountryCode = sinon.spy(() => 'US')
  getSystemLocale = sinon.spy(() => 'en-US')
  getPreferredSystemLanguages = sinon.spy(() => ['en-US'])
  addRecentDocument = sinon.spy()
  clearRecentDocuments = sinon.spy()
  setAsDefaultProtocolClient = sinon.spy()
  removeAsDefaultProtocolClient = sinon.spy()
  isDefaultProtocolClient = sinon.spy(
    () => true,
  ) as Electron.App['isDefaultProtocolClient'] & sinon.SinonSpy
  getApplicationNameForProtocol = sinon.spy(
    () => 'MockApp',
  ) as Electron.App['getApplicationNameForProtocol'] & sinon.SinonSpy
  getApplicationInfoForProtocol = sinon.spy(() =>
    Promise.resolve({
      name: 'MockApp',
      path: '/path/to/app',
      icon: null,
    }),
  ) as Electron.App['getApplicationInfoForProtocol'] & sinon.SinonSpy
  setUserTasks = sinon.spy()
  getJumpListSettings = sinon.spy(() => ({
    minItems: 0,
    removedItems: [],
  }))
  setJumpList = sinon.spy()
  requestSingleInstanceLock = sinon.spy(() => true)
  hasSingleInstanceLock = sinon.spy(() => true)
  releaseSingleInstanceLock = sinon.spy()
  setUserActivity = sinon.spy()
  getCurrentActivityType = sinon.spy()
  invalidateCurrentActivity = sinon.spy()
  resignCurrentActivity = sinon.spy()
  updateCurrentActivity = sinon.spy()
  setAppUserModelId = sinon.spy()
  setActivationPolicy = sinon.spy()
  importCertificate = sinon.spy()
  configureHostResolver = sinon.spy()
  disableHardwareAcceleration = sinon.spy()
  disableDomainBlockingFor3DAPIs = sinon.spy()
  getAppMetrics = sinon.spy(() => [])
  getGPUFeatureStatus = sinon.spy(() => ({}) as Electron.GPUFeatureStatus)
  getGPUInfo = sinon.spy(() => Promise.resolve({}))
  setBadgeCount = sinon.spy()
  getBadgeCount = sinon.spy(() => 0)
  isUnityRunning = sinon.spy(() => false)
  private _loginItemSettings: Electron.LoginItemSettings = {
    openAtLogin: false,
    openAsHidden: false,
    wasOpenedAtLogin: false,
    wasOpenedAsHidden: false,
    restoreState: false,
    status: 'not-found',
    executableWillLaunchAtLogin: true,
    launchItems: [],
  }
  getLoginItemSettings = sinon.spy(() => this._loginItemSettings)
  setLoginItemSettings = sinon.spy(
    (settings: Partial<Electron.LoginItemSettings>) => {
      Object.assign(this._loginItemSettings, settings)
    },
  )
  isAccessibilitySupportEnabled = sinon.spy(
    () => this.accessibilitySupportEnabled,
  )
  setAccessibilitySupportEnabled = sinon.spy(
    (enabled: boolean) => (this.accessibilitySupportEnabled = enabled),
  )
  showAboutPanel = sinon.spy()
  setAboutPanelOptions = sinon.spy()
  isEmojiPanelSupported = sinon.spy(() => true)
  showEmojiPanel = sinon.spy()
  startAccessingSecurityScopedResource = sinon.spy(
    // fun!
    () => () => Promise.resolve(''),
  )
  enableSandbox = sinon.spy()
  isInApplicationsFolder = sinon.spy(() => true)
  moveToApplicationsFolder = sinon.spy()
  isSecureKeyboardEntryEnabled = sinon.spy(() => false)
  setSecureKeyboardEntryEnabled = sinon.spy()
  setProxy = sinon.spy()
  resolveProxy = sinon.spy((url: string) => Promise.resolve(url))
  setClientCertRequestPasswordHandler = sinon.spy()

  // Properties
  accessibilitySupportEnabled = false
  applicationMenu: Electron.Menu = null
  commandLine = {
    appendSwitch: sinon.spy(),
    appendArgument: sinon.spy(),
    hasSwitch: sinon.spy(),
    getSwitchValue: sinon.spy(),
    removeSwitch: sinon.spy(),
  }
  dock = {
    bounce: sinon.spy(),
    cancelBounce: sinon.spy(),
    downloadFinished: sinon.spy(),
    setBadge: sinon.spy(),
    getBadge: sinon.spy(),
    hide: sinon.spy(),
    show: sinon.spy(),
    isVisible: sinon.spy(),
    setMenu: sinon.spy(),
    getMenu: sinon.spy(),
    setIcon: sinon.spy(),
  }
  badgeCount: number = 0
  isPackaged: boolean = true
  name = 'MockApp'
  userAgentFallback = 'MockApp'
  runningUnderARM64Translation = false

  constructor() {
    super()
  }
}
