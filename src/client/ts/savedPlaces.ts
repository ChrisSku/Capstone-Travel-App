import { html, render } from 'lit-html'
import * as _ from './helperFunctions'
import { getSavedTrips, Trip, deleteTripById } from './apiHandler'
import { renderSavedTripList, renderSavedTrip } from './tripData'
import { renderBestPlaces } from './bestPlaces'

import '../styles/saved-places.scss'

const openTrip = (item: string, trip: Trip) => {
  setActiveTripElement(item)
  renderSavedTrip(trip, _.main())
}

const deleteTrip = async (id: number) => {
  if (confirm('Are you shore to delete this Trip ?')) {
    const status = await deleteTripById(id).then(it => it.status)
    if (status !== 202) return
    if (_.getHashSave()['tripId'] === String(id))
      history.pushState(null, '', '#')
    await init()
  }
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
    const trip = savedTrips.find(it => String(it.id) === presetTripName)!
    renderSavedTrip(trip, _.main())
  } else {
    renderBestPlaces()
    render(html`<h1 class="empty">You have not saved a Trip yet</h1>`, _.main())
  }
}
