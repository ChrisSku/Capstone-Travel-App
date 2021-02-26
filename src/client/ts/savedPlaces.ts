import { html, render } from 'lit-html'
import {
  main,
  aside,
  converStringToLocaledDate,
  getHashSave
} from './helperFunctions'
import {
  getSavedTrips,
  Location,
  getPictures,
  PictureData,
  Trip,
  deleteTripByName
} from './apiHandler'
import { renderTripList } from './tripData'

import '../styles/saved-places.scss'

function renderPicture(pictures: PictureData[], element: HTMLElement) {
  element.style.backgroundImage = 'url(' + pictures[0].previewURL + ')'
}

const renderMain = (trip: Trip) => {
  const data = html`<div class="trip-editor">
    <h1>${getHashSave()['trip']}</h1>
    <div class="current-saved-trips" id="currentSavedTrips"></div>
  </div>`
  render(data, main())
  renderTripList(
    trip.locations.map(it => it.location),
    document.getElementById('currentSavedTrips')!
  )
}

const locationsTemp = ({ location, startDate, endDate }: Location) => html`
  <div class="location-container" key=${location}>
    <div class="loction-name">${location}</div>
    <div class="location-date">
      From: ${converStringToLocaledDate(startDate)}
    </div>
    <div class="location-date">To: ${converStringToLocaledDate(endDate)}</div>
  </div>
`
const packingItemTemp = (packingItem: string) => html`<div>${packingItem}</div>`

const openTrip = (item: string, trip: Trip) => {
  setActiveTripElement(item)
  renderMain(trip)
}

const deleteTrip = async (item: string) => {
  const status = await deleteTripByName(item).then(it => it.status)
  if (status !== 202) return
  if (getHashSave()['trip'] === item) history.pushState(null, '', '#')
  await init()
}

const savedTripTemp = (item: string, trip: Trip) => html`
  <div class="trip-container" id=${item}>
    <h3>${item}</h3>
    <div class="action-items">
      <button id="open-${item}" @click=${() => openTrip(item, trip)}>
        Open Trip
      </button>
      <button id="delete-${item}" @click=${() => deleteTrip(item)}>
        DELETE
      </button>
    </div>

    <div class="locations-container ">
      ${trip.locations.length
        ? trip.locations.map(locationsTemp)
        : html`<div class="empty">No location added to this Trip yet!</div>`}
    </div>
    <div class="packing-list">
      <h4>Packing List:</h4>
      ${trip.packingList.length
        ? trip.packingList.map(packingItemTemp)
        : html`<div class="empty">No Items added to your Packlist yet!</div>`}
    </div>
  </div>
`
const renderLocationPicture = (location: string, tripName: string) => {
  const pictureHolder = document.querySelectorAll(
    `.location-container[key="${location}"]`
  )
  getPictures({ name: location, countryName: tripName }).then(picData =>
    pictureHolder.forEach(it => renderPicture(picData, it as HTMLElement))
  )
}

const setActiveTripElement = (tripName: string) => {
  history.pushState(null, '', '#trip=' + tripName)
  const tripContainer = Array.from(
    document.getElementsByClassName('trip-container')
  )
  tripContainer.forEach(it =>
    it.id === tripName
      ? it.classList.add('active')
      : it.classList.remove('active')
  )
}

const renderAside = (savedTrips: { [name: string]: Trip }) => {
  const template = [html`<h2>My Saved Trips</h2>`]
  for (const tripName in savedTrips) {
    if (Object.prototype.hasOwnProperty.call(savedTrips, tripName)) {
      const savedTrip = savedTrips[tripName]
      template.push(savedTripTemp(tripName, savedTrip))
      render(template, aside())
      savedTrip.locations.forEach(it =>
        renderLocationPicture(it.location, tripName)
      )
    }
  }
}

export async function init() {
  const savedTrips = await getSavedTrips()
  const savedTripKeys = Object.keys(savedTrips)
  const hashTripName = getHashSave()['trip']
  const presetTripName = savedTripKeys.includes(hashTripName)
    ? hashTripName
    : savedTripKeys[0]
  if (savedTripKeys.length) {
    renderAside(savedTrips)
    setActiveTripElement(presetTripName)
    renderMain(savedTrips[presetTripName])
  } else {
    render(
      html`<div class="empty">No Items added to your Packlist yet!</div>`,
      aside()
    )
    render(html`<div class="empty">There are no Trips</div>`, main())
  }
}
