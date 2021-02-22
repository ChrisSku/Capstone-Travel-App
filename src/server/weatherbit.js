const axios = require('axios')

const API_KEY = process.env.WHEATER_BIT_API_KEY
const BASE_URL = 'https://api.weatherbit.io/v2.0'

const mockData = require('./mock.json')

function forecastByCity(city, country) {
    const dataFromMock = mockData[city]
    if (dataFromMock) {
        console.log('Used Mock: ' + city)
        return Promise.resolve(dataFromMock)
    }
    const url = `${BASE_URL}/forecast/daily?city=${city}&country=${country}&key=${API_KEY}`
    return axios.get(url).then(({ data }) => data)
}

function forecastByLocation(lat, long) {
    const url = `${BASE_URL}/forecast/daily?&lat=${lat}&lon=${long}&key=${API_KEY}`
    return axios.get(url).then(({ data }) => data)
}

module.exports = {
    forecastByCity,
    forecastByLocation
}
