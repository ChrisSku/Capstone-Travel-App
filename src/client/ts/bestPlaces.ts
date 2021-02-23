import { html, render } from 'lit-html'
import { renderTripList, converDataSring, renderTrip } from './tripData'

import '../styles/best-places.scss'

const BACKEND_BASE_URL = 'http://localhost:3000'

const main = document.querySelector('main')!
const aside = document.querySelector('aside')!

const startDate = new Date()
const endDate = new Date()
endDate.setDate(endDate.getDate() + 14)

const asideTemplate = html`<div class="popular-header">Popular Places</div>
    <div class="popular-container" id="popularContainer"></div>`

export async function renderBestPlaces() {
    render(asideTemplate, aside)

    const bestPlaces: string[] = await fetch(
        BACKEND_BASE_URL + '/trips/best-places'
    ).then((it) => it.json())
    const popularContainer = document.getElementById('popularContainer')!
    if (!popularContainer.textContent?.includes('Madrid'))
        renderTripList(bestPlaces, popularContainer)
}

function renderCurrentBestPlace(place: string) {
    renderTrip(
        place,
        converDataSring(startDate),
        converDataSring(endDate),
        'bestSelectedPlace',
        main
    )
}

export async function init() {
    window.location.hash = 'Madrid'
    renderBestPlaces()
    renderCurrentBestPlace('Madrid')
}
