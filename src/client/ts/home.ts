import { html, render } from 'lit-html'
import { loader } from './pageLoader'
import { renderTrip, converDataSring } from './tripData'
import { renderBestPlaces } from './bestPlaces'

import /* webpackPrefetch: true */ '../styles/main-home.scss'

const main = document.querySelector('main')!
const aside = document.querySelector('aside')!

const welcomeScreen = html`<div id="welcome" class="active">
    Welcome to <br /><span class="logo"
        ><img src="TravelIcon.svg" alt="Backpack-ICON" /> Backpack</span
    >
    your Travel Planer
</div>`

const searchbar = html`<form id="searchBar">
    <label id="searchBarLabel">Search for your next Trip</label>
    <div class="formContainer">
        <fieldset>
            <label for="placeInput">Where</label>
            <input
                id="placeInput"
                name="placeInput"
                placeholder="Search Country"
                required="required"
            />
        </fieldset>
        <fieldset>
            <label for="startDateInput">Start Date</label>
            <input
                type="date"
                id="startDateInput"
                name="startDateInput"
                required="required"
            />
        </fieldset>
        <fieldset>
            <label for="endDateInput">End Date</label>
            <input
                type="date"
                id="endDateInput"
                name="endDateInput"
                required="required"
            />
        </fieldset>
        <fieldset>
            <input type="submit" id="submitSearch" value="SEARCH" />
        </fieldset>
    </div>
</form>`

const searchresult = html`<div id="searchResult" class="empty"></div>`

const mainTemplate = html`${welcomeScreen}${searchbar}${searchresult}`

export function init() {
    renderBestPlaces()
    render(mainTemplate, main)
    const startDateInput = document.getElementById(
        'startDateInput'
    ) as HTMLInputElement
    startDateInput.value = converDataSring(new Date())
    const endDateInput = document.getElementById(
        'endDateInput'
    ) as HTMLInputElement
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 14)
    endDateInput.value = converDataSring(endDate)

    const searchBar = document.getElementById('searchBar')
    const welcome = document.getElementById('welcome')
    const searchResult = document.getElementById('searchResult')
    const placeInput = document.getElementById('placeInput') as HTMLInputElement

    searchBar?.addEventListener('submit', (event) => {
        event.preventDefault()
        welcome?.classList.add('hide')
        render(loader(), searchResult!)
        renderTrip(
            placeInput.value,
            startDateInput.value,
            endDateInput.value,
            'searchTrip',
            searchResult!
        )
    })

    welcome?.addEventListener('animationend', (event) => {
        if (event.animationName === 'fade-out') {
            welcome?.classList.remove('active')
            searchBar?.classList.add('active')
        }
    })
}
