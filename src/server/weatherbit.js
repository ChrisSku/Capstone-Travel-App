const axios = require('axios')

const API_KEY = process.env.WHEATER_BIT_API_KEY
const BASE_URL = 'https://api.weatherbit.io/v2.0'

const getHistoryDateSring = (inputDateString, offset = 0) => {
  const date = new Date(inputDateString)
  date.setFullYear(date.getFullYear() - 1)
  date.setDate(date.getDate() + offset)
  return date.toISOString().substring(0, 10)
}

function historyByLocation(lat, long, date) {
  const start = getHistoryDateSring(date)
  const end = getHistoryDateSring(date, 1)
  const url = `${BASE_URL}/history/daily?lat=${lat}&lon=${long}&start_date=${start}&end_date=${end}&key=${API_KEY}`
  return axios.get(url).then(({ data }) => data)
}

function forecastByLocation(lat, long) {
  const url = `${BASE_URL}/forecast/daily?&lat=${lat}&lon=${long}&key=${API_KEY}`
  return axios.get(url).then(({ data }) => data)
}

module.exports = {
  historyByLocation,
  forecastByLocation
}
