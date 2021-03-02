import * as api from '../src/client/ts/apiHandler'

const locationData: api.LocationData = {
  name: 'test',
  countryName: 'test',
  lat: 'test',
  lng: 'test',
  population: 2000,
  countryCode: 'test',
  fclName: 'test'
}

describe('get Location Data', () => {
  it('function exists', () => expect(api.getLocationData).toBeDefined())

  it('expect mock result on api', async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(locationData)
      })
    )
    const locationData = await api.getLocationData('Madrid')
    expect(locationData).toEqual(locationData)
  })
})

describe('get weateher Data', () => {
  it('function exists', () => expect(api.getWeatherData).toBeDefined())

  it('expect mock result on api', async () => {
    const result: api.WeatherData = {
      data: [
        {
          clouds: 20,
          max_temp: 20,
          temp: 20,
          min_temp: 20,
          datetime: '2022-10-10',
          weather: { icon: 'icon', description: 'description' }
        }
      ]
    }
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(result)
      })
    )
    const weatherData = await api.getWeatherData(locationData)
    expect(weatherData).toEqual(result)
  })
})
