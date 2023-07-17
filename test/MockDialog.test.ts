import { MockDialog } from '../src/'
import { expect } from 'chai'

describe('MockDialog', () => {
  it('should be constructable', () => {
    const mockDialog = new MockDialog()
    expect(mockDialog).to.be.an.instanceof(MockDialog)
  })

  it('should be able to showOpenDialog', async () => {
    // create the mock
    const mockDialog = new MockDialog()
    // configure the return value of the mock
    const returnValue = {
      filePaths: ['foo.txt'],
      canceled: false,
    } as Electron.OpenDialogReturnValue
    mockDialog.showOpenDialog.resolves(returnValue)
    // convert the type of the mock
    const dialog = mockDialog as Electron.Dialog
    // call the method under test
    const result = await dialog.showOpenDialog({
      title: 'title',
      defaultPath: 'defaultPath',
    })
    expect(mockDialog.showOpenDialog.calledOnce).to.be.true
    expect(
      mockDialog.showOpenDialog.calledWith({
        title: 'title',
        defaultPath: 'defaultPath',
      })
    ).to.be.true
    expect(result).to.deep.equal(returnValue)
  })

  it('should be able to showSaveDialog', async () => {
    // create the mock
    const mockDialog = new MockDialog()
    // configure the return value of the mock
    const returnValue = {
      filePath: 'foo.txt',
      canceled: false,
    } as Electron.SaveDialogReturnValue
    mockDialog.showSaveDialog.resolves(returnValue)
    // convert the type of the mock
    const dialog = mockDialog as Electron.Dialog
    // call the method under test
    const result = await dialog.showSaveDialog({
      title: 'title',
      defaultPath: 'defaultPath',
    })
    expect(mockDialog.showSaveDialog.calledOnce).to.be.true
    expect(
      mockDialog.showSaveDialog.calledWith({
        title: 'title',
        defaultPath: 'defaultPath',
      })
    ).to.be.true
    expect(result).to.deep.equal(returnValue)
  })

  it('should be able to showMessageBox', async () => {
    // create the mock
    const mockDialog = new MockDialog()
    // configure the return value of the mock
    const returnValue = {
      checkboxChecked: false,
      response: 0, // index of the button clicked
    } as Electron.MessageBoxReturnValue
    mockDialog.showMessageBox.resolves(returnValue)
    // convert the type of the mock
    const dialog = mockDialog as Electron.Dialog
    // call the method under test
    const result = await dialog.showMessageBox({
      title: 'title',
      message: 'message',
    })
    expect(mockDialog.showMessageBox.calledOnce).to.be.true
    expect(
      mockDialog.showMessageBox.calledWith({
        title: 'title',
        message: 'message',
      })
    ).to.be.true
    expect(result).to.deep.equal(returnValue)
  })

  it('should be able to showErrorBox', () => {
    // create the mock
    const mockDialog = new MockDialog()
    // convert the type of the mock
    const dialog = mockDialog as Electron.Dialog
    // call the method under test
    dialog.showErrorBox('title', 'content')
    expect(mockDialog.showErrorBox.calledOnce).to.be.true
    expect(mockDialog.showErrorBox.calledWith('title', 'content')).to.be.true
  })

  it('should be able to showMessageBoxSync', async () => {
    // create the mock
    const mockDialog = new MockDialog()
    // configure the return value of the mock
    const returnValue = 0
    mockDialog.showMessageBoxSync.returns(returnValue)
    // convert the type of the mock
    const dialog = mockDialog as Electron.Dialog
    // call the method under test
    const result = dialog.showMessageBoxSync({
      title: 'title',
      message: 'message',
    })
    expect(mockDialog.showMessageBoxSync.calledOnce).to.be.true
    expect(
      mockDialog.showMessageBoxSync.calledWith({
        title: 'title',
        message: 'message',
      })
    ).to.be.true
    expect(result).to.equal(returnValue)
  })

  it('should be able to showOpenDialogSync', async () => {
    // create the mock
    const mockDialog = new MockDialog()
    // configure the return value of the mock
    const returnValue = ['foo.txt']
    mockDialog.showOpenDialogSync.returns(returnValue)
    // convert the type of the mock
    const dialog = mockDialog as Electron.Dialog
    // call the method under test
    const result = dialog.showOpenDialogSync({
      title: 'title',
      defaultPath: 'defaultPath',
    })
    expect(mockDialog.showOpenDialogSync.calledOnce).to.be.true
    expect(
      mockDialog.showOpenDialogSync.calledWith({
        title: 'title',
        defaultPath: 'defaultPath',
      })
    ).to.be.true
    expect(result).to.deep.equal(returnValue)
  })

  it('should be able to showSaveDialogSync', async () => {
    // create the mock
    const mockDialog = new MockDialog()
    // configure the return value of the mock
    const returnValue = {
      filePath: 'foo.txt',
      canceled: false,
    } as Electron.SaveDialogReturnValue
    mockDialog.showSaveDialogSync.returns(returnValue)
    // convert the type of the mock
    const dialog = mockDialog as Electron.Dialog
    // call the method under test
    const result = dialog.showSaveDialogSync({
      title: 'title',
      defaultPath: 'defaultPath',
    })
    expect(mockDialog.showSaveDialogSync.calledOnce).to.be.true
    expect(
      mockDialog.showSaveDialogSync.calledWith({
        title: 'title',
        defaultPath: 'defaultPath',
      })
    ).to.be.true
    expect(result).to.deep.equal(returnValue)
  })
})
