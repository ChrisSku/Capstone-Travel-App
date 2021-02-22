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
    res.json(await geoNames.location(req.query.location))
})

app.get('/trips/weather', async (req, res) => {
    const location = req.query.location
    const countryCode = req.query.countryCode
    const lat = req.query.lat
    const long = req.query.long
    let weatherData
    if (location)
        weatherData = await weatherbit.forecastByCity(location, countryCode)
    if (!weatherData && lat && long)
        weatherData = await weatherbit.forecastByLocation(lat, long)
    res.json(weatherData)
})

app.get('/trips/pictures', async (req, res) => {
    const location = req.query.location
    const fclName = req.query.fclName
    let pictureData = []
    if (location) pictureData = await pixabay.getPicturesByName(location)
    if (!pictureData.length && fclName)
        pictureData = await pixabay.getPicturesByName(fclName)
    res.json(pictureData)
})

app.post('/trips', async (req, res) => {})

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}/ !\n`)
)
