/*
  this module handles all the requests to the pixabay api
*/

const axios = require('axios')

const API_KEY = process.env.PIXABAY_API_KEY
const BASE_URL = 'https://pixabay.com/api'

function getPicturesByName(name) {
  const url = `${BASE_URL}?q=${name}&per_page=10&image_type=photo&key=${API_KEY}`
  return axios.get(url).then(({ data }) => data.hits)
}

module.exports = {
  getPicturesByName
}
