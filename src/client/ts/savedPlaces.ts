import { html, render } from 'lit-html'
import { main, aside, converStringToLocaledDate } from './helperFunctions'
import { getSavedTrips, Trip, getPictures, PictureData } from './apiHandler'

import '../styles/saved-places.scss'

function renderPicture(pictures: PictureData[], element: HTMLElement) {
    element.style.backgroundImage = 'url(' + pictures[0].previewURL + ')'
}

const renderMain = () => {
    const data = html`<div>SAVED PLACES</div>`
    render(data, main())
}

const getLocationsTemp = ({ location, startDate, endDate }: Trip) => html`
    <div class="location-container" key=${location}>
        <div class="loction-name">${location}</div>
        <div class="location-date">
            From: ${converStringToLocaledDate(startDate)}
        </div>
        <div class="location-date">
            To: ${converStringToLocaledDate(endDate)}
        </div>
    </div>
`

const getSavedTripTemp = (item: string, locations: Trip[]) => html`
    <div class="trip-container" id=${item}>
        <h3>${item}</h3>
        <div class="locations-container">
            ${locations.map(getLocationsTemp)}
        </div>
        <div class="packing-list"></div>
    </div>
`
const renderLocationPicture = (location: string, tripName: string) => {
    console.log(location)
    const pictureHolder = document.querySelectorAll(
        `.location-container[key="${location}"]`
    )
    getPictures({ name: location, fclName: tripName }).then((picData) =>
        pictureHolder.forEach((it) => renderPicture(picData, it as HTMLElement))
    )
}

const renderAside = async () => {
    const template = [html`<h2>My Saved Trips</h2>`]
    const savedTrips = await getSavedTrips()
    for (const tripName in savedTrips) {
        if (Object.prototype.hasOwnProperty.call(savedTrips, tripName)) {
            const savedTrip = savedTrips[tripName]
            template.push(getSavedTripTemp(tripName, savedTrip))
            render(template, aside())
            savedTrip.forEach((it) =>
                renderLocationPicture(it.location, tripName)
            )
        }
    }
}

export function init() {
    renderMain()
    renderAside()
}
