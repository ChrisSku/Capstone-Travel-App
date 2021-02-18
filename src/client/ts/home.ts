import { html, render } from 'lit-html'
import { loader } from './pageLoader'

import '../styles/main-home.scss'

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
    <fieldset>
        <label for="placeInput">Where</label>
        <input id="placeInput" name="placeInput" placeholder="Search Country" />
    </fieldset>
    <fieldset>
        <label for="dateInput">Start Date</label>
        <input
            type="date"
            id="dateInput"
            name="dateInput"
            value="${new Date().toISOString().substring(0, 10)}"
        />
    </fieldset>
    <fieldset>
        <input type="submit" id="submitSearch" value="SEARCH" />
    </fieldset>
</form>`

const searchresult = html`<div id="searchResult" class="empty"></div>`

const mainTemplate = html`${welcomeScreen}${searchbar}${searchresult}`
const asideTemplate = html`<div>Popular Places</div>`

export function init() {
    render(mainTemplate, main)
    render(asideTemplate, aside)
    const searchBar = document.getElementById('searchBar')
    const welcome = document.getElementById('welcome')
    const searchResult = document.getElementById('searchResult')

    searchBar?.addEventListener('submit', (event) => {
        event.preventDefault()
        welcome?.classList.add('hide')
        render(loader(), searchResult!)
    })

    welcome?.addEventListener('animationend', (event) => {
        if (event.animationName === 'fade-out') {
            welcome?.classList.remove('active')
            searchBar?.classList.add('active')
        }
    })
}
