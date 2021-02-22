import { html, render, TemplateResult } from 'lit-html'

import /* webpackPrefetch: true */ '../styles/trip.scss'

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

const getTripHtml = ({ name, countryName }: LocationData, key: string) =>
    html`<div id=${key} class="trip-element huge">
        <div class="country-header">${countryName}</div>
        <div class="location-name">${name}</div>
        <label class="weather-label">Weather</label>
        <div class="weather-data"></div>
        <label class="galery-label">Galery</label>
        <div class="picture-galery"></div>
    </div>`

const getMediumTripHtml = (
    { name, countryName }: LocationData,
    key: string,
    active: boolean = false
) =>
    html`<div id=${key} class="trip-element medium">
        <div class="country-header">${countryName}</div>
        <div class="location-name">${name}</div>
        <div class="weather-data"></div>
    </div>`

function renderWeather(
    weather: WeatherData,
    element: Element | DocumentFragment
) {
    const weatherItem = (it: DateWeatherData) =>
        html`<div class="weather-item">
            <div class="date">
                ${new Date(it.datetime).toLocaleDateString()}
            </div>
            <div class="temp">${it.temp}°C</div>
            <div class="temp-range">${it.min_temp}°C - ${it.max_temp}°C</div>
            <img
                src="img/${it.weather.icon}.png"
                alt="${it.weather.description}"
            />
        </div>`

    render(
        weather.data.map((it) => weatherItem(it)),
        element
    )
}

function renderPictureGalery(pictures: PictureData[], galery: HTMLElement) {
    const pictureHtml = (picture: PictureData) =>
        html`<img src="${picture.webformatURL}" />`
    render(pictures.map(pictureHtml), galery)
}

function renderPicture(
    pictures: PictureData[],
    element: HTMLElement,
    galery: HTMLElement | null = null
) {
    if (!galery)
        element.style.backgroundImage = 'url(' + pictures[0].webformatURL + ')'
    if (!galery) return
    element.style.backgroundImage = 'url(' + pictures[0].largeImageURL + ')'
    renderPictureGalery(pictures.slice(1), galery)
}

export async function renderTrip(
    location: string,
    startDate: string,
    endDate: string,
    key: string,
    element: Element | DocumentFragment
) {
    const locationData: LocationData = await getLocationData(location)
    // getWeatherData(locationData)
    render(getTripHtml(locationData, key), element)
    const tripElementContainter = document.getElementById(key)
    const pictureGalery = tripElementContainter?.querySelector(
        '.picture-galery'
    ) as HTMLElement
    getPictures(locationData).then((it) =>
        renderPicture(it, tripElementContainter!, pictureGalery)
    )
    const weatherContainer = tripElementContainter?.querySelector(
        '.weather-data'
    )
    getWeatherData(locationData).then((it: WeatherData) =>
        renderWeather(it, weatherContainer!)
    )
}

export async function renderTripList(
    locations: string[],
    startDate: string,
    endDate: string,
    element: Element | DocumentFragment
) {
    const trips: TemplateResult[] = []
    for (let index = 0; index < locations.length; index++) {
        const locationData = await getLocationData(locations[index])
        const currentLocation = window.location.hash.substr(1)
        trips.push(
            getMediumTripHtml(
                locationData,
                index + 'place',
                locationData.name === currentLocation
            )
        )
        render(trips, element)
        const tripElementContainter = document.getElementById(index + 'place')
        getPictures(locationData).then((it) =>
            renderPicture(it, tripElementContainter!)
        )
        const weatherContainer = tripElementContainter?.querySelector(
            '.weather-data'
        )
        getWeatherData(locationData).then((it: WeatherData) =>
            renderWeather(it, weatherContainer!)
        )
    }
}

export const converDataSring = (date: Date) =>
    date.toISOString().substring(0, 10)
