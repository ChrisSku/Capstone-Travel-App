const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const port = 3000
dotenv.config()
const geoNames = require('./geoNames.js')
const weatherbit = require('./weatherbit.js')
const pixabay = require('./pixabay.js')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(express.static('dist'))

app.get('/trips/best-places', (req, res) => {
  res.json(['Madrid', 'kuala lumpur', 'Singapur', 'manhattan', 'brooklyn'])
})

app.get('/trips/locations', async (req, res) => {
  res.json(await geoNames.location(encodeURIComponent(req.query.location)))
})

app.get('/trips/weather', async (req, res) => {
  const location = req.query.location
  const countryCode = req.query.countryCode
  const lat = req.query.lat
  const long = req.query.long
  let weatherData
  try {
    if (location)
      weatherData = await weatherbit.forecastByCity(location, countryCode)
    if (!weatherData && lat && long)
      weatherData = await weatherbit.forecastByLocation(lat, long)
  } catch (_) {
    weatherData = await weatherbit.forecastByLocation(lat, long)
  }
  res.json(weatherData)
})

app.get('/trips/pictures', async (req, res) => {
  const location = req.query.location
  const countryName = req.query.countryName
  let pictureData = []
  try {
    if (location) pictureData = await pixabay.getPicturesByName(location)
    if (!pictureData.length && countryName)
      pictureData = await pixabay.getPicturesByName(countryName)
  } catch (_) {
    pictureData = await pixabay.getPicturesByName(countryName)
  }
  res.json(pictureData)
})

const tripsData = [
  {
    id: 0,
    location: 'Bonança',
    startDate: '2021-04-02',
    endDate: '2021-04-11'
  },
  { id: 1, location: 'Madrid', startDate: '2021-02-25', endDate: '2021-03-11' },
  {
    id: 2,
    location: 'Barcelona',
    startDate: '2021-03-12',
    endDate: '2021-03-18'
  },
  {
    id: 3,
    location: 'Valencia',
    startDate: '2021-03-19',
    endDate: '2021-03-23'
  },
  { id: 4, location: 'Seville', startDate: '2021-03-24', endDate: '2021-04-01' }
]

app.get('/trips/saved', (req, res) => {
  res.json(tripsData)
})

app.get('/trips/saved/:name', (req, res) => {
  res.send(tripsData.find(it => it.location === req.params.name))
})

app.put('/trips/saved', (req, res) => {
  tripsData.push({
    ...req.body,
    id: Math.max(...tripsData.map(it => it.id)) + 1
  })
  res.sendStatus(201)
})

app.delete('/trips/saved/:id', (req, res) => {
  tripsData.splice(req.params.id, 1)
  res.sendStatus(202)
})

app.listen(port, () =>
  console.log(`Example app listening on port http://localhost:${port}/ !\n`)
)
