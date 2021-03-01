import { html, render } from 'lit-html'
import * as _ from './helperFunctions'
import { getSavedTrips, Trip, deleteTripById } from './apiHandler'
import { renderSavedTripList } from './tripData'
import { renderBestPlaces } from './bestPlaces'

import '../styles/saved-places.scss'

// function renderPicture(pictures: PictureData[], element: HTMLElement) {
//   element.style.backgroundImage = 'url(' + pictures[0].previewURL + ')'
// }

// const locationsTemp = ({ location, startDate, endDate }: Location) => html`
//   <div class="location-container" key=${location}>
//     <div class="loction-name">${location}</div>
//     <div class="location-date">
//       From: ${converStringToLocaledDate(startDate)}
//     </div>
//     <div class="location-date">To: ${converStringToLocaledDate(endDate)}</div>
//   </div>
// `
// const packingItemTemp = (packingItem: string) => html`<div>${packingItem}</div>`

// const savedTripTemp = (item: string, trip: Trip) => html`
//   <div class="trip-container" id=${item}>
//     <h3>${item}</h3>
//     <div class="action-items">
//       <button id="open-${item}" @click=${() => openTrip(item, trip)}>
//         Open Trip
//       </button>
//       <button id="delete-${item}" @click=${() => deleteTrip(item)}>
//         DELETE
//       </button>
//     </div>

//     <div class="locations-container ">
//       ${trip.locations.length
//         ? trip.locations.map(locationsTemp)
//         : html`<div class="empty">No location added to this Trip yet!</div>`}
//     </div>
//     <div class="packing-list">
//       <h4>Packing List:</h4>
//       ${trip.packingList.length
//         ? trip.packingList.map(packingItemTemp)
//         : html`<div class="empty">No Items added to your Packlist yet!</div>`}
//     </div>
//   </div>
//`
// const renderLocationPicture = (location: string, tripName: string) => {
//   const pictureHolder = document.querySelectorAll(
//     `.location-container[key="${location}"]`
//   )
//   getPictures({ name: location, countryName: tripName }).then(picData =>
//     pictureHolder.forEach(it => renderPicture(picData, it as HTMLElement))
//   )
// }

const renderMain = (trip: Trip) => {
  const data = html`<div class="trip-editor">
    <h1>${trip.location}</h1>
    <div class="current-saved-trips" id="currentSavedTrips"></div>
  </div>`
  render(data, _.main())
}

const openTrip = (item: string, trip: Trip) => {
  setActiveTripElement(item)
  renderMain(trip)
}

const deleteTrip = async (id: number) => {
  const status = await deleteTripById(id).then(it => it.status)
  if (status !== 202) return
  if (_.getHashSave()['tripId'] === String(id)) history.pushState(null, '', '#')
  await init()
}

const setEventListener = (trips: Trip[]) => {
  const deleteButtons = document.querySelectorAll('.delete-trip')
  deleteButtons.forEach(button =>
    button.addEventListener('click', () =>
      deleteTrip(parseInt(button.getAttribute('key')!))
    )
  )
  const openButtons = document.querySelectorAll('.open-trip')
  openButtons.forEach(button =>
    button.addEventListener('click', () => {
      const id = button.getAttribute('key')!
      openTrip(id, trips.find(it => String(it.id) === id)!)
    })
  )
}

const setActiveTripElement = (tripName: string) => {
  history.pushState(null, '', '#tripId=' + tripName)
  const tripContainer = Array.from(document.querySelectorAll('.trip-element'))
  tripContainer.forEach(it => {
    it.id === tripName + '-place'
      ? it.classList.add('active')
      : it.classList.remove('active')
  })
}

export async function init() {
  const savedTrips = (await getSavedTrips()).sort((a, b) =>
    a.startDate > b.startDate ? 1 : -1
  )

  if (savedTrips.length) {
    const hashTripName = _.getHashSave()['tripId']
    const presetTripName = savedTrips.some(it => String(it.id) === hashTripName)
      ? hashTripName
      : String(savedTrips[0].id)
    render(
      html`<h2>My Saved Trips</h2>
        <div class="saved-container" id="savedContainer"></div>`,
      _.aside()
    )
    const savedContainer = document.querySelector('#savedContainer')!
    await renderSavedTripList(savedTrips, savedContainer)
    setActiveTripElement(presetTripName)
    setEventListener(savedTrips)
    renderMain(savedTrips.find(it => String(it.id) === hashTripName)!)
  } else {
    renderBestPlaces()
    render(html`<h1 class="empty">You have not saved a Trip yet</h1>`, _.main())
  }
}
