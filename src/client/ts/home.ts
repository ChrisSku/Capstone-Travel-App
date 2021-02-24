import {
    converDataSring,
    getInputById,
    main,
    endDateInput,
    startDateInput,
    getDefaultEndDate
} from './helperFunctions'
import { html, render } from 'lit-html'
import { loader } from './pageLoader'
import { renderTrip } from './tripData'
import { renderBestPlaces } from './bestPlaces'

import '../styles/main-home.scss'

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

const searchresult = html`<div id="searchResult" class="empty"></div>`
const mainTemplate = html`${welcomeBannerTemp}${searchbar}${searchresult}`

const searchForLocation = () => {
    const searchBar = document.getElementById('searchBar')
    const welcomeBanner = document.getElementById('welcome')
    const searchResult = document.getElementById('searchResult')
    const placeInput = getInputById('placeInput')

    searchBar?.addEventListener('submit', (event) => {
        event.preventDefault()
        welcomeBanner?.classList.add('hide')
        render(loader(), searchResult!)
        renderTrip(placeInput.value, 'searchTrip', searchResult!)
    })

    welcomeBanner?.addEventListener('animationend', (event) => {
        if (event.animationName === 'fade-out') {
            welcomeBanner?.classList.remove('active')
            searchBar?.classList.add('active')
        }
    })
}

export function init() {
    renderBestPlaces()
    render(mainTemplate, main())

    startDateInput().value = converDataSring(new Date())
    endDateInput().value = getDefaultEndDate

    searchForLocation()
}
