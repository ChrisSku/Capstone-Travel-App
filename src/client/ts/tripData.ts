import { converStringToLocaledDate } from './helperFunctions'
import { html, render, TemplateResult } from 'lit-html'
const tripDialog = () => import('./tripDialog')
import * as api from './apiHandler'

import '../styles/trip.scss'

const getTripHtml = ({ name, countryName }: api.LocationData, key: string) =>
  html`<div id=${key} class="trip-element huge">
    <div class="trip-actions" id="buttonCountainer">
      <button class="addToTrip">+ Add Trip</button>
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
    <div class="trip-actions" id="buttonCountainer">
      <button class="addToTrip">+ Add Trip</button>
    </div>
    <div class="country-header">${countryName}</div>
    <div class="location-name">${name}</div>
    <div class="weather-data"></div>
  </div>`

const getImage = (icon: string) =>
  `https://www.weatherbit.io/static/img/icons/${icon}.png`

const renderWeather = async (
  locationData: api.LocationData,
  parent: Element | DocumentFragment
) => {
  const weatherItem = (it: api.DateWeatherData) =>
    html`<div class="weather-item">
      <div class="date">${converStringToLocaledDate(it.datetime)}</div>
      <div class="temp">${it.temp}°C</div>
      <div class="temp-range">${it.min_temp}°C - ${it.max_temp}°C</div>
      <img src=${getImage(it.weather.icon)} alt="${it.weather.description}" />
    </div>`
  const weather = await api.getWeatherData(locationData)
  render(
    weather.data.map(it => weatherItem(it)),
    parent.querySelector('.weather-data')!
  )
}

function renderPictureGalery(pictures: api.PictureData[], parent: HTMLElement) {
  const galery = parent?.querySelector('.picture-galery') as HTMLElement
  const pictureHtml = (picture: api.PictureData) =>
    html`<img src="${picture.webformatURL}" />`
  render(pictures.map(pictureHtml), galery)
}

const renderPicture = async (
  locationData: api.LocationData,
  element: HTMLElement,
  galery: Boolean = false
) => {
  const pictures = await api.getPictures(locationData)
  if (!galery) {
    element.style.backgroundImage = `url(${pictures[0].webformatURL})`
    return
  }
  element.style.backgroundImage = `url(${pictures[0].largeImageURL})`
  renderPictureGalery(pictures.slice(1), element)
}

const buttonEventAddTrip = (location: string, parent: Element) => {
  const addTripButton = parent.querySelector('.addToTrip')
  addTripButton?.addEventListener('click', () =>
    tripDialog().then(it => it.open(location))
  )
}

export async function renderTrip(
  location: string,
  key: string,
  element: Element
) {
  const locationData = await api.getLocationData(location)
  render(getTripHtml(locationData, key), element)
  const tripElementContainter = document.getElementById(key)!
  renderPicture(locationData, tripElementContainter, true)
  renderWeather(locationData, tripElementContainter)
  buttonEventAddTrip(locationData.name, tripElementContainter)
}

export function renderTripList(locations: string[], element: Element) {
  const trips: TemplateResult[] = []
  locations.forEach(async (it, i) => {
    const locationData = await api.getLocationData(it)
    trips.push(getMediumTripHtml(locationData, i + 'place'))
    render(trips, element)
    const tripElementContainter = document.getElementById(i + 'place')!
    renderPicture(locationData, tripElementContainter)
    renderWeather(locationData, tripElementContainter)
    buttonEventAddTrip(locationData.name, tripElementContainter)
  })
}
