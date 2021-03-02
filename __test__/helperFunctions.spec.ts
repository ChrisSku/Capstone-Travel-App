import * as _ from '../src/client/ts/helperFunctions'

describe('get input by id', () => {
  it('function exists', () => expect(_.getInputById).toBeDefined())

  it('expect input element', () => {
    const inputElement = "<input id='inputTest' type='text' value='Test' />"
    document.body.insertAdjacentHTML('afterbegin', inputElement)
    const resultElement = _.getInputById('inputTest')
    expect(resultElement.value).toBe('Test')
    expect(resultElement.type).toBe('text')
  })
})

describe('add EventListener by id', () => {
  it('function exists', () => expect(_.addEventListenerById).toBeDefined())

  it('expect event to be called', () => {
    const inputElement = "<button id='buttonTest'>Test</button>"
    document.body.insertAdjacentHTML('afterbegin', inputElement)
    const handler = jest.fn()
    _.addEventListenerById('buttonTest', 'click', handler)
    const element = document.getElementById('buttonTest')
    element!.click()
    expect(handler).toBeCalledTimes(1)
  })
})
