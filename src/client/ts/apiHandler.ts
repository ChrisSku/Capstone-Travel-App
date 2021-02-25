const BACKEND_BASE_URL = 'http://localhost:3000'
interface LocationData {
    name: string
    countryName: string
    lat: string
    lng: string
    population: number
    countryCode: string
    fclName: string
}

interface WeatherIcon {
    icon: string
    description: string
}

interface DateWeatherData {
    max_temp: number
    temp: number
    min_temp: number
    datetime: string
    weather: WeatherIcon
}

interface WeatherData {
    timezone: string
    data: DateWeatherData[]
}

interface PictureData {
    webformatURL: string
    largeImageURL: string
    previewURL: string
}

type Location = {
    location: string
    startDate: string
    endDate: string
}

type Trip = {
    locations: Location[]
    packingList: string[]
}

const locationDataUrl = `${BACKEND_BASE_URL}/trips/locations?location=`
const getLocationData = (location: string) =>
    fetch(locationDataUrl + location).then((it) => it.json())

function getWeatherData({
    name: location,
    countryCode,
    lat,
    lng: long
}: LocationData) {
    const params = new URLSearchParams({ location, countryCode, lat, long })
    const url = `${BACKEND_BASE_URL}/trips/weather?${params}`
    return fetch(url).then((it) => it.json())
}

function getPictures({ name: location, fclName }: any) {
    const params = new URLSearchParams({
        location,
        fclName: fclName.split(',')[0]
    })
    const url = `${BACKEND_BASE_URL}/trips/pictures?${params}`
    return fetch(url).then((it) => it.json())
}

function getSavedTrips(): Promise<{ [name: string]: Trip }> {
    const url = `${BACKEND_BASE_URL}/trips/saved`
    return fetch(url).then((it) => it.json())
}

function getSavedTripNames(): Promise<string[]> {
    const url = `${BACKEND_BASE_URL}/trips/saved/names`
    return fetch(url).then((it) => it.json())
}

function saveTripName(name: string): Promise<string[]> {
    const url = `${BACKEND_BASE_URL}/trips/saved/names`
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
    }).then((it) => it.json())
}

function saveTripLocationByName(name: string, data: any) {
    const url = `${BACKEND_BASE_URL}/trips/saved/${name}/locations`
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}

export {
    LocationData,
    WeatherData,
    DateWeatherData,
    PictureData,
    Trip,
    Location,
    getLocationData,
    getWeatherData,
    getPictures,
    getSavedTripNames,
    saveTripName,
    saveTripLocationByName,
    getSavedTrips
}
