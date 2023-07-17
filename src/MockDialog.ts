import sinon from 'sinon'

export class MockDialog implements Electron.Dialog {
  public showOpenDialog = sinon.stub().resolves({
    filePaths: ['test-file.txt'],
    canceled: false,
  } as Electron.OpenDialogReturnValue)
  public showSaveDialog = sinon.stub().resolves({
    filePath: 'test-file.txt',
    canceled: false,
  } as Electron.SaveDialogReturnValue)
  public showMessageBox = sinon.stub().resolves({
    response: 0, // index of the button clicked
    checkboxChecked: false,
  } as Electron.MessageBoxReturnValue)
  public showErrorBox = sinon.stub()
  public showCertificateTrustDialog = sinon.stub()
  public showMessageBoxSync = sinon.stub().returns(0)
  public showOpenDialogSync = sinon.stub().returns(['test-file.txt'])
  public showSaveDialogSync = sinon.stub().returns('test-file.txt')
  public showCertificateTrustDialogSync = sinon.stub()
}
