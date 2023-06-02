import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { MockScreen } from '../src/MockScreen'
import { MockDisplay } from '../src/MockDisplay'

chai.use(chaiAsPromised)

describe('MockScreen', () => {
  it('should be able to create a new screen', () => {
    const screen: Electron.Screen = new MockScreen()
    expect(screen).to.be.an.instanceof(MockScreen)
  })

  it('should be able to create a new screen with displays', () => {
    const screen: Electron.Screen = new MockScreen([new MockDisplay()])
    expect(screen).to.be.an.instanceof(MockScreen)
  })

  it('should be able to add a display', () => {
    const screen: Electron.Screen = new MockScreen()
    const display1 = screen.getPrimaryDisplay()
    const display2 = new MockDisplay()
    ;(screen as MockScreen).addDisplay(display2)
    expect(screen.getAllDisplays().length).to.equal(2)
    const ids = screen.getAllDisplays().map((d) => d.id)
    expect(ids).to.deep.equal([display1.id, display2.id])
  })
})
