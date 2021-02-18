const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')
const port = 3000
dotenv.config()

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(express.static('dist'))

app.get('/test', (req, res) => {
    res.json({ test: 'test' })
})

app.listen(port, function () {
    console.log(`Example app listening on port http://localhost:${port}/ !\n`)
})
