import * as _ from './helperFunctions'
import { html, render, TemplateResult } from 'lit-html'
const tripDialog = () => import('./tripDialog')
import * as api from './apiHandler'

import '../styles/trip.scss'

const getTripHtml = ({ name, countryName }: api.LocationData, key: number) =>
  html`<div id="${key}-place" class="trip-element huge">
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

const getSavedMediumTripHtml = (
  { name, countryName }: api.LocationData,
  key: string
) =>
  html`<div id=${key} class="trip-element medium">
    <div class="trip-actions" id="buttonCountainer">
      <button class="open-trip" key=${key.split('-')[0]}>Open</button>
      <button class="delete-trip" key=${key.split('-')[0]}>DELETE</button>
    </div>
    <div class="country-header">${countryName}</div>
    <div class="location-name">${name}</div>
    <div class="weather-data"></div>
  </div>`

const getImage = (icon: string) =>
  `https://www.weatherbit.io/static/img/icons/${icon}.png`

const getImageByCloudyness = (clouds: number) => {
  if (clouds < 20) return getImage('c01d')
  if (clouds < 60) return getImage('c02d')
  if (clouds < 80) return getImage('c03d')
  return getImage('c04d')
}

const weatherItem = (it: api.DateWeatherData) =>
  html`<div class="weather-item">
    <div class="date">${_.converStringToLocaledDate(it.datetime)}</div>
    <div class="temp">${it.temp}°C</div>
    <div class="temp-range">${it.min_temp}°C - ${it.max_temp}°C</div>
    <img src=${getImage(it.weather.icon)} alt="${it.weather.description}" />
  </div>`

const estimatedWeatherItem = (it: api.DateWeatherData) =>
  html`<div class="weather-item">
    <div class="date">Typical Weather:</div>
    <div class="temp">${it.temp}°C</div>
    <div class="temp-range">${it.min_temp}°C - ${it.max_temp}°C</div>
    <img src=${getImageByCloudyness(it.clouds)} alt="cloudiness" />
  </div>`

const noWeatherItem = html`<div class="weather-item">
  <div class="date">Unavailable</div>
  <div class="temp"></div>
  <div class="temp-range"></div>
  <img src=${getImage('t05d')} alt="cloudiness" />
</div>`

const renderWeather = async (
  locationData: api.LocationData,
  parent: Element | DocumentFragment,
  startDate: string = '',
  endDate: string = ''
) => {
  try {
    let weather = (await api.getWeatherData(locationData)).data
    if (startDate && endDate)
      weather = weather.filter(
        it => startDate <= it.datetime && it.datetime <= endDate
      )
    const weatherHtml = weather.map(it => weatherItem(it))
    if (endDate > _.getDefaultEndDate)
      weatherHtml.push(
        estimatedWeatherItem(
          (await api.getEstimatedWeatherData(locationData, startDate)).data[0]
        )
      )
    render(weatherHtml, parent.querySelector('.weather-data')!)
  } catch (error) {
    render(noWeatherItem, parent.querySelector('.weather-data')!)
  }
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

export async function renderTrip(trip: api.Trip, element: Element) {
  const locationData = await api.getLocationData(trip.location)
  render(getTripHtml(locationData, trip.id), element)
  const tripElementContainter = document.getElementById(`${trip.id}-place`)!
  renderPicture(locationData, tripElementContainter, true)
  const { startDate, endDate } = trip
  renderWeather(locationData, tripElementContainter, startDate, endDate)
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

export async function renderSavedTripList(trips: api.Trip[], element: Element) {
  const tripsHtml: TemplateResult[] = []
  for (const trip of trips) {
    const locationData = await api.getLocationData(trip.location)
    tripsHtml.push(getSavedMediumTripHtml(locationData, trip.id + '-place'))
    render(tripsHtml, element)
    const tripElementContainter = document.getElementById(trip.id + '-place')!
    const { startDate, endDate } = trip
    renderPicture(locationData, tripElementContainter)
    renderWeather(locationData, tripElementContainter, startDate, endDate)
  }
}
