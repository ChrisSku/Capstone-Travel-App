import { converStringToLocaledDate } from './helperFunctions'
import { html, render, TemplateResult } from 'lit-html'
const tripDialog = () => import('./tripDialog')
import * as api from './apiHandler'

import '../styles/trip.scss'

const getTripHtml = ({ name, countryName }: api.LocationData, key: string) =>
    html`<div id=${key} class="trip-element huge">
        <div class="trip-actions" id="buttonCountainer">
            <button id="addToTrip">+ Add to Trip</button>
        </div>
        <div class="country-header">${countryName}</div>
        <div class="location-name">${name}</div>
        <label class="weather-label">Weather</label>
        <div class="weather-data"></div>
        <label class="galery-label">Galery</label>
        <div class="picture-galery"></div>
    </div>`

const getMediumTripHtml = (
    { name, countryName }: api.LocationData,
    key: string
) =>
    html`<div id=${key} class="trip-element medium">
        <div class="country-header">${countryName}</div>
        <div class="location-name">${name}</div>
        <div class="weather-data"></div>
    </div>`

const getImage = (icon: string) =>
    `https://www.weatherbit.io/static/img/icons/${icon}.png`

function renderWeather(
    weather: api.WeatherData,
    element: Element | DocumentFragment
) {
    const weatherItem = (it: api.DateWeatherData) =>
        html`<div class="weather-item">
            <div class="date">${converStringToLocaledDate(it.datetime)}</div>
            <div class="temp">${it.temp}°C</div>
            <div class="temp-range">${it.min_temp}°C - ${it.max_temp}°C</div>
            <img
                src=${getImage(it.weather.icon)}
                alt="${it.weather.description}"
            />
        </div>`

    render(
        weather.data.map((it) => weatherItem(it)),
        element
    )
}

function renderPictureGalery(pictures: api.PictureData[], galery: HTMLElement) {
    const pictureHtml = (picture: api.PictureData) =>
        html`<img src="${picture.webformatURL}" />`
    render(pictures.map(pictureHtml), galery)
}

function renderPicture(
    pictures: api.PictureData[],
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
    key: string,
    element: Element | DocumentFragment
) {
    const locationData: api.LocationData = await api.getLocationData(location)
    render(getTripHtml(locationData, key), element)
    const tripElementContainter = document.getElementById(key)
    const pictureGalery = tripElementContainter?.querySelector(
        '.picture-galery'
    ) as HTMLElement
    api.getPictures(locationData).then((it) =>
        renderPicture(it, tripElementContainter!, pictureGalery)
    )
    const weatherContainer = tripElementContainter?.querySelector(
        '.weather-data'
    )
    api.getWeatherData(locationData).then((it: api.WeatherData) =>
        renderWeather(it, weatherContainer!)
    )
    const addTripButton = document.getElementById('addToTrip')
    addTripButton?.addEventListener('click', () =>
        tripDialog().then((it) => it.open(locationData.name))
    )
}

export async function renderTripList(
    locations: string[],
    element: Element | DocumentFragment
) {
    const trips: TemplateResult[] = []
    for (let index = 0; index < locations.length; index++) {
        const locationData = await api.getLocationData(locations[index])
        trips.push(getMediumTripHtml(locationData, index + 'place'))
        render(trips, element)
        const tripElementContainter = document.getElementById(index + 'place')
        api.getPictures(locationData).then((it) =>
            renderPicture(it, tripElementContainter!)
        )
        const weatherContainer = tripElementContainter?.querySelector(
            '.weather-data'
        )
        api.getWeatherData(locationData).then((it) =>
            renderWeather(it, weatherContainer!)
        )
    }
}
