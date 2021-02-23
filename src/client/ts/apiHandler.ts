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
}

function getLocationData(location: string) {
    const url = `${BACKEND_BASE_URL}/trips/locations?location=${location}`
    return fetch(url).then((it) => it.json())
}

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

function getPictures({ name: location, fclName }: LocationData) {
    const params = new URLSearchParams({
        location,
        fclName: fclName.split(',')[0]
    })
    const url = `${BACKEND_BASE_URL}/trips/pictures?${params}`
    return fetch(url).then((it) => it.json())
}

function getSavedTrips(): Promise<string[]> {
    const url = `${BACKEND_BASE_URL}/trips/names`
    return fetch(url).then((it) => it.json())
}

export {
    LocationData,
    WeatherData,
    DateWeatherData,
    PictureData,
    getLocationData,
    getWeatherData,
    getPictures,
    getSavedTrips
}
