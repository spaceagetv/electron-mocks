import { expect } from 'chai'
import { MockApp } from '../src/MockApp'

describe('MockApp', () => {
  let app: MockApp

  beforeEach(() => {
    app = new MockApp()
  })

  it('should create an instance of MockApp', () => {
    expect(app).to.be.an.instanceof(MockApp)
  })

  it('should spy on quit method', () => {
    app.quit()
    expect(app.quit.calledOnce).to.be.true
  })

  it('should spy on exit method', () => {
    app.exit()
    expect(app.exit.calledOnce).to.be.true
  })

  it('should spy on relaunch method', () => {
    app.relaunch()
    expect(app.relaunch.calledOnce).to.be.true
  })

  it('should spy on isReady method', () => {
    const result = app.isReady()
    expect(app.isReady.calledOnce).to.be.true
    expect(result).to.be.true
  })

  it('should spy on whenReady method', async () => {
    const result = await app.whenReady()
    expect(app.whenReady.calledOnce).to.be.true
    expect(result).to.be.undefined
  })

  it('should spy on focus method', () => {
    app.focus()
    expect(app.focus.calledOnce).to.be.true
  })

  it('should spy on hide method', () => {
    app.hide()
    expect(app.hide.calledOnce).to.be.true
  })

  it('should spy on isHidden method', () => {
    const result = app.isHidden()
    expect(app.isHidden.calledOnce).to.be.true
    expect(result).to.be.false
  })

  it('should spy on show method', () => {
    app.show()
    expect(app.show.calledOnce).to.be.true
  })

  it('should spy on getAppPath method', () => {
    const result = app.getAppPath()
    expect(app.getAppPath.calledOnce).to.be.true
    expect(result).to.equal('/path/to/app')
  })

  it('should spy on getPath method', () => {
    const result = app.getPath('test')
    expect(app.getPath.calledOnce).to.be.true
    expect(result).to.equal('/path/to/test')
  })

  it('should spy on getVersion method', () => {
    const result = app.getVersion()
    expect(app.getVersion.calledOnce).to.be.true
    expect(result).to.equal('1.0.0')
  })

  it('should spy on getName method', () => {
    const result = app.getName()
    expect(app.getName.calledOnce).to.be.true
    expect(result).to.equal('MockApp')
  })

  it('should spy on getLocale method', () => {
    const result = app.getLocale()
    expect(app.getLocale.calledOnce).to.be.true
    expect(result).to.equal('en-US')
  })

  it('should spy on getLocaleCountryCode method', () => {
    const result = app.getLocaleCountryCode()
    expect(app.getLocaleCountryCode.calledOnce).to.be.true
    expect(result).to.equal('US')
  })

  it('should spy on getSystemLocale method', () => {
    const result = app.getSystemLocale()
    expect(app.getSystemLocale.calledOnce).to.be.true
    expect(result).to.equal('en-US')
  })

  it('should spy on getPreferredSystemLanguages method', () => {
    const result = app.getPreferredSystemLanguages()
    expect(app.getPreferredSystemLanguages.calledOnce).to.be.true
    expect(result).to.deep.equal(['en-US'])
  })

  it('should spy on addRecentDocument method', () => {
    app.addRecentDocument('test')
    expect(app.addRecentDocument.calledOnce).to.be.true
  })

  it('should spy on clearRecentDocuments method', () => {
    app.clearRecentDocuments()
    expect(app.clearRecentDocuments.calledOnce).to.be.true
  })

  it('should spy on setAsDefaultProtocolClient method', () => {
    app.setAsDefaultProtocolClient('test')
    expect(app.setAsDefaultProtocolClient.calledOnce).to.be.true
  })

  it('should spy on removeAsDefaultProtocolClient method', () => {
    app.removeAsDefaultProtocolClient('test')
    expect(app.removeAsDefaultProtocolClient.calledOnce).to.be.true
  })

  it('should spy on isDefaultProtocolClient method', () => {
    const result = app.isDefaultProtocolClient('test')
    expect(app.isDefaultProtocolClient.calledOnce).to.be.true
    expect(result).to.be.true
  })

  it('should spy on getApplicationNameForProtocol method', () => {
    const result = app.getApplicationNameForProtocol('test')
    expect(app.getApplicationNameForProtocol.calledOnce).to.be.true
    expect(result).to.equal('MockApp')
  })

  it('should spy on getApplicationInfoForProtocol method', async () => {
    const result = await app.getApplicationInfoForProtocol('test')
    expect(app.getApplicationInfoForProtocol.calledOnce).to.be.true
    expect(result).to.deep.equal({
      name: 'MockApp',
      path: '/path/to/app',
      icon: null,
    })
  })

  it('should spy on setUserTasks method', () => {
    app.setUserTasks([])
    expect(app.setUserTasks.calledOnce).to.be.true
  })

  it('should spy on getJumpListSettings method', () => {
    const result = app.getJumpListSettings()
    expect(app.getJumpListSettings.calledOnce).to.be.true
    expect(result).to.deep.equal({
      minItems: 0,
      removedItems: [],
    })
  })

  it('should spy on setJumpList method', () => {
    app.setJumpList([])
    expect(app.setJumpList.calledOnce).to.be.true
  })

  it('should spy on requestSingleInstanceLock method', () => {
    const result = app.requestSingleInstanceLock()
    expect(app.requestSingleInstanceLock.calledOnce).to.be.true
    expect(result).to.be.true
  })

  it('should spy on hasSingleInstanceLock method', () => {
    const result = app.hasSingleInstanceLock()
    expect(app.hasSingleInstanceLock.calledOnce).to.be.true
    expect(result).to.be.true
  })

  it('should spy on releaseSingleInstanceLock method', () => {
    app.releaseSingleInstanceLock()
    expect(app.releaseSingleInstanceLock.calledOnce).to.be.true
  })

  it('should spy on setUserActivity method', () => {
    app.setUserActivity('test', {})
    expect(app.setUserActivity.calledOnce).to.be.true
  })

  it('should spy on getCurrentActivityType method', () => {
    const result = app.getCurrentActivityType()
    expect(app.getCurrentActivityType.calledOnce).to.be.true
    expect(result).to.be.undefined
  })

  it('should spy on invalidateCurrentActivity method', () => {
    app.invalidateCurrentActivity()
    expect(app.invalidateCurrentActivity.calledOnce).to.be.true
  })

  it('should spy on resignCurrentActivity method', () => {
    app.resignCurrentActivity()
    expect(app.resignCurrentActivity.calledOnce).to.be.true
  })

  it('should spy on updateCurrentActivity method', () => {
    app.updateCurrentActivity('test', {})
    expect(app.updateCurrentActivity.calledOnce).to.be.true
  })

  it('should spy on setAppUserModelId method', () => {
    app.setAppUserModelId('test')
    expect(app.setAppUserModelId.calledOnce).to.be.true
  })

  it('should spy on setActivationPolicy method', () => {
    app.setActivationPolicy('test')
    expect(app.setActivationPolicy.calledOnce).to.be.true
  })

  it('should spy on importCertificate method', () => {
    app.importCertificate({})
    expect(app.importCertificate.calledOnce).to.be.true
  })

  it('should spy on configureHostResolver method', () => {
    app.configureHostResolver({})
    expect(app.configureHostResolver.calledOnce).to.be.true
  })

  it('should spy on disableHardwareAcceleration method', () => {
    app.disableHardwareAcceleration()
    expect(app.disableHardwareAcceleration.calledOnce).to.be.true
  })

  it('should spy on disableDomainBlockingFor3DAPIs method', () => {
    app.disableDomainBlockingFor3DAPIs()
    expect(app.disableDomainBlockingFor3DAPIs.calledOnce).to.be.true
  })

  it('should spy on getAppMetrics method', () => {
    const result = app.getAppMetrics()
    expect(app.getAppMetrics.calledOnce).to.be.true
    expect(result).to.deep.equal([])
  })

  it('should spy on getGPUFeatureStatus method', () => {
    const result = app.getGPUFeatureStatus()
    expect(app.getGPUFeatureStatus.calledOnce).to.be.true
    expect(result).to.deep.equal({})
  })

  it('should spy on getGPUInfo method', async () => {
    const result = await app.getGPUInfo()
    expect(app.getGPUInfo.calledOnce).to.be.true
    expect(result).to.deep.equal({})
  })

  it('should spy on setBadgeCount method', () => {
    app.setBadgeCount(1)
    expect(app.setBadgeCount.calledOnce).to.be.true
  })

  it('should spy on getBadgeCount method', () => {
    const result = app.getBadgeCount()
    expect(app.getBadgeCount.calledOnce).to.be.true
    expect(result).to.equal(0)
  })

  it('should spy on isUnityRunning method', () => {
    const result = app.isUnityRunning()
    expect(app.isUnityRunning.calledOnce).to.be.true
    expect(result).to.be.false
  })

  it('should spy on getLoginItemSettings method', () => {
    const result = app.getLoginItemSettings()
    expect(app.getLoginItemSettings.calledOnce).to.be.true
    expect(result).to.deep.equal({
      openAtLogin: false,
      openAsHidden: false,
      wasOpenedAtLogin: false,
      wasOpenedAsHidden: false,
      restoreState: false,
      status: 'not-found',
      executableWillLaunchAtLogin: true,
      launchItems: [],
    })
  })

  it('should spy on setLoginItemSettings method', () => {
    app.setLoginItemSettings({ openAtLogin: true })
    expect(app.setLoginItemSettings.calledOnce).to.be.true
    expect(app.getLoginItemSettings().openAtLogin).to.be.true
  })

  it('should spy on isAccessibilitySupportEnabled method', () => {
    const result = app.isAccessibilitySupportEnabled()
    expect(app.isAccessibilitySupportEnabled.calledOnce).to.be.true
    expect(result).to.be.false
  })

  it('should spy on setAccessibilitySupportEnabled method', () => {
    app.setAccessibilitySupportEnabled(true)
    expect(app.setAccessibilitySupportEnabled.calledOnce).to.be.true
    expect(app.isAccessibilitySupportEnabled()).to.be.true
  })

  it('should spy on showAboutPanel method', () => {
    app.showAboutPanel()
    expect(app.showAboutPanel.calledOnce).to.be.true
  })

  it('should spy on setAboutPanelOptions method', () => {
    app.setAboutPanelOptions({})
    expect(app.setAboutPanelOptions.calledOnce).to.be.true
  })

  it('should spy on isEmojiPanelSupported method', () => {
    const result = app.isEmojiPanelSupported()
    expect(app.isEmojiPanelSupported.calledOnce).to.be.true
    expect(result).to.be.true
  })

  it('should spy on showEmojiPanel method', () => {
    app.showEmojiPanel()
    expect(app.showEmojiPanel.calledOnce).to.be.true
  })

  it('should spy on startAccessingSecurityScopedResource method', () => {
    const result = app.startAccessingSecurityScopedResource()
    expect(app.startAccessingSecurityScopedResource.calledOnce).to.be.true
    expect(result).to.be.a('function')
  })

  it('should spy on enableSandbox method', () => {
    app.enableSandbox()
    expect(app.enableSandbox.calledOnce).to.be.true
  })

  it('should spy on isInApplicationsFolder method', () => {
    const result = app.isInApplicationsFolder()
    expect(app.isInApplicationsFolder.calledOnce).to.be.true
    expect(result).to.be.true
  })

  it('should spy on moveToApplicationsFolder method', () => {
    app.moveToApplicationsFolder()
    expect(app.moveToApplicationsFolder.calledOnce).to.be.true
  })

  it('should spy on isSecureKeyboardEntryEnabled method', () => {
    const result = app.isSecureKeyboardEntryEnabled()
    expect(app.isSecureKeyboardEntryEnabled.calledOnce).to.be.true
    expect(result).to.be.false
  })

  it('should spy on setSecureKeyboardEntryEnabled method', () => {
    app.setSecureKeyboardEntryEnabled(true)
    expect(app.setSecureKeyboardEntryEnabled.calledOnce).to.be.true
  })

  it('should spy on setProxy method', () => {
    app.setProxy({})
    expect(app.setProxy.calledOnce).to.be.true
  })

  it('should spy on resolveProxy method', async () => {
    const result = await app.resolveProxy('test')
    expect(app.resolveProxy.calledOnce).to.be.true
    expect(result).to.equal('test')
  })

  it('should spy on setClientCertRequestPasswordHandler method', () => {
    app.setClientCertRequestPasswordHandler(() => {})
    expect(app.setClientCertRequestPasswordHandler.calledOnce).to.be.true
  })
})
