const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const geoNames = require('./geoNames.js')
const weatherbit = require('./weatherbit.js')
const pixabay = require('./pixabay.js')

// Initiat the server app config
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(express.static('dist'))

// trips data object
let tripsData = [
  {
    id: 0,
    location: 'Bonança',
    startDate: '2021-04-02',
    endDate: '2021-04-11'
  },
  { id: 1, location: 'Madrid', startDate: '2021-02-25', endDate: '2021-03-11' },
  { id: 4, location: 'Seville', startDate: '2021-03-24', endDate: '2021-04-01' }
]

// ---
// rest halnding
app.get('/trips/best-places', (req, res) => {
  res.json(['Madrid', 'kuala lumpur', 'Singapur', 'manhattan', 'brooklyn'])
})

app.get('/trips/locations', async (req, res) => {
  res.json(await geoNames.location(encodeURIComponent(req.query.location)))
})

app.get('/trips/weather', async (req, res) => {
  const lat = req.query.lat
  const long = req.query.lng
  try {
    res.json(await weatherbit.forecastByLocation(lat, long))
  } catch (error) {
    res.status(error.response.status).send(error.response.data.status_message)
  }
})

app.get('/trips/weather/history', async (req, res) => {
  const { lat, lng: long, date } = req.query
  try {
    res.json(await weatherbit.historyByLocation(lat, long, date))
  } catch (error) {
    res.status(error.response.status).send(error.response.data.status_message)
  }
})

app.get('/trips/pictures', async (req, res) => {
  const name = req.query.name
  const countryName = req.query.countryName
  let pictureData = []
  try {
    if (name) pictureData = await pixabay.getPicturesByName(name)
    if (!pictureData.length && countryName)
      pictureData = await pixabay.getPicturesByName(countryName)
  } catch (_) {
    pictureData = await pixabay.getPicturesByName(countryName)
  }
  res.json(pictureData)
})

app.get('/trips/saved', (req, res) => {
  res.json(tripsData)
})

app.get('/trips/saved/:name', (req, res) => {
  res.send(tripsData.find(it => it.location === req.params.name))
})

app.post('/trips/saved', (req, res) => {
  tripsData.push({
    ...req.body,
    id: Math.max(...tripsData.map(it => it.id)) + 1
  })
  res.sendStatus(201)
})

app.put('/trips/saved', (req, res) => {
  const data = req.body
  const index = tripsData.findIndex(it => it.id !== data.id)

  tripsData[index] = data
  res.sendStatus(202)
})

app.delete('/trips/saved/:id', (req, res) => {
  const index = tripsData.findIndex(it => it.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).send('trip not found')
  tripsData = tripsData.filter(it => it.id !== parseInt(req.params.id))
  res.sendStatus(202)
})
// ---

module.exports = app
