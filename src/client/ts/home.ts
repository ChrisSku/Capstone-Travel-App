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
    <input id="placeInput" /> <input type="date" id="dateInput" />
    <input type="submit" id="submitSearch" value="SEARCH" />
</form>`

const searchresult = html`<div id="searchResult"></div>`

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

    welcome?.addEventListener('animationend', function (e) {
        console.log(e)
        if (e.animationName === 'fade-out') {
            welcome?.classList.remove('active')
            searchBar?.classList.add('active')
        }
    })
}
