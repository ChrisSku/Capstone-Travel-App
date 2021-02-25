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
    const fclName = req.query.fclName
    let pictureData = []
    try {
        if (location) pictureData = await pixabay.getPicturesByName(location)
        if (!pictureData.length && fclName)
            pictureData = await pixabay.getPicturesByName(fclName)
    } catch (_) {
        console.log(fclName)
        pictureData = await pixabay.getPicturesByName(fclName)
    }
    res.json(pictureData)
})

const tripsData = {
    'America 🇺🇸': { locations: [], packingList: [] },
    'Europe 🇪🇺': { locations: [], packingList: [] }
}

app.get('/trips/saved', async (req, res) => {
    res.json(tripsData)
})

app.get('/trips/saved/names', async (req, res) => {
    res.json(Object.keys(tripsData))
})
app.put('/trips/saved/names', async (req, res) => {
    if (tripsData[req.body.name])
        return res.status(409).send(req.body.name + ' does already exists!')
    if (req.body.name === 'names')
        return res.status(409).send(req.body.name + ' is an key name')
    tripsData[req.body.name] = { locations: [], packingList: [] }
    res.json(Object.keys(tripsData))
})

app.put('/trips/saved/:name/locations', async (req, res) => {
    tripsData[req.params.name].locations.push(req.body)
    res.send()
})

app.put('/trips/saved/:name', async (req, res) => {
    tripsData[req.params.name].push(req.body)
    res.send()
})

app.get('/trips/saved/:name', async (req, res) => {
    res.json(tripsData[req.params.name])
})

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}/ !\n`)
)
