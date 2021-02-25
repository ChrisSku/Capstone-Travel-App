const axios = require('axios')

const API_KEY = process.env.GEO_NAMES_USERNAME
const BASE_URL = 'http://api.geonames.org'

async function searchNames(name) {
  const url = `${BASE_URL}/search?name_startsWith=${name}&maxRows=6&type=json&username=${API_KEY}`
  const geonames = await axios.get(url).then(({ data }) => data.geonames)
  return geonames.map(it => it.name).filter((v, i, a) => a.indexOf(v) == i)
}

function location(name) {
  const url = `${BASE_URL}/search?name_equals=${name}&maxRows=1&type=json&username=${API_KEY}`
  return axios.get(url).then(({ data }) => data.geonames[0])
}

module.exports = {
  searchNames,
  location
}
