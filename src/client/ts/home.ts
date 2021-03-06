import * as _ from './helperFunctions'
import { html, render } from 'lit-html'
import { loader } from './pageLoader'
import { renderTrip } from './tripData'
import { renderBestPlaces } from './bestPlaces'

import '../styles/main-home.scss'
import { Trip } from './apiHandler'

const welcomeBannerTemp = html`<div id="welcome" class="active">
  Welcome to <br />
  <span class="logo">
    <img src="TravelIcon.svg" alt="Backpack-ICON" /> Backpack
  </span>
  your Travel Planer
</div>`

const inputField = (id: string, text: string, optional: any) => html`<fieldset>
  <label for="${id}">${text}</label>
  <input
    id="${id}"
    .placeholder=${optional.placeholder || ''}
    .type=${optional.type || ''}
    required
  />
</fieldset>`

const searchbar = html`<form id="searchBar">
  <label id="searchBarLabel">Search for your next Trip</label>
  <div class="formContainer">
    ${inputField('placeInput', 'Where', { placeholder: 'Search Country' })}
    ${inputField('startDateInput', 'Start Date', { type: 'date' })}
    ${inputField('endDateInput', 'End Date', { type: 'date' })}
    <fieldset>
      <input type="submit" id="submitSearch" value="SEARCH" />
    </fieldset>
  </div>
</form>`

const addEventListener = () => {
  const searchBar = document.getElementById('searchBar')
  const welcomeBanner = document.getElementById('welcome')
  const searchResult = document.getElementById('searchResult')
  const placeInput = _.getInputById('placeInput')

  searchBar?.addEventListener('submit', event => {
    event.preventDefault()
    welcomeBanner?.classList.add('hide')
    render(loader(), searchResult!)
    const trip: Trip = {
      id: -1,
      location: placeInput.value,
      startDate: _.startDateInput().value,
      endDate: _.endDateInput().value
    }
    renderTrip(trip, searchResult!)
  })

  welcomeBanner?.addEventListener('animationend', event => {
    if (event.animationName === 'fade-out') {
      welcomeBanner?.classList.remove('active')
      searchBar?.classList.add('active')
    }
  })
}

const searchresult = html`<div id="searchResult"></div>`
const mainTemplate = html`${welcomeBannerTemp}${searchbar}${searchresult}`

export function init() {
  renderBestPlaces()
  render(mainTemplate, _.main())
  _.startDateInput().value = _.converDateToSring(new Date())
  _.endDateInput().value = _.getDefaultEndDate
  addEventListener()
}
