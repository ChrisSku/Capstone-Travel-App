import { html, render } from 'lit-html'
import { getSavedTrips } from './apiHandler'
import '../styles/tripDialog.scss'

const create = () => {
    let dialog = document.getElementById('dialogBackGround')
    if (dialog) return dialog
    document.body.insertAdjacentHTML(
        'beforeend',
        '<div class="dialog-background hidden" id="dialogBackGround"></div>'
    )
    return document.getElementById('dialogBackGround')!
}

async function savedTrips() {
    const items = await getSavedTrips()
    console.log(items)
    const savedTrip = (item: string) => {
        const id = item.replace(' ', '-')
        item.replace(' ', '-')
        return html`<input
                type="radio"
                id="${id}"
                name="savedTrips"
                value="${id}"
            />
            <label for="${id}">${item}</label><br />`
    }
    return items.map(savedTrip)
}

async function showDialog(
    location: string,
    startDate: string,
    endDate: string,
    dialog: HTMLElement
) {
    const content = html`<div class="trip-dialog" id="tripDialog">
        <h3>Add ${location} to your Trips</h3>
        <div class="trip-data">
            <label for="startDateDialog">Start Date</label>
            <input type="date" id="startDateDialog" value="${startDate}" />
            <label for="endDateDialog">End Date</label>
            <input type="date" id="endDateDialog" value="${endDate}" />
        </div>
        <div class="trip-names">
            <h4>Your Saved Trips:</h4>
            ${await savedTrips()}
            <form id="createTrip">
                <input placeholder="Create new Trip" />
                <input type="submit" value="+" />
            </form>
        </div>
        <div class="dialog-actions">
            <button id="closeButton">CLOSE</button>
            <button id="saveButton" class="primary disabled">SAVE</button>
        </div>
    </div>`
    render(content, dialog)
    dialog.classList.remove('hidden')
}

export async function open(
    location: string,
    startDate: string,
    endDate: string
) {
    const dialogBackGround = create()
    await showDialog(location, startDate, endDate, dialogBackGround)
    dialogBackGround.addEventListener('click', (event: MouseEvent) => {
        if (event.target === dialogBackGround)
            dialogBackGround.classList.add('hidden')
    })
    const saveButton = document.getElementById('saveButton')!
    saveButton.addEventListener('click', () => {})
    const closeButton = document.getElementById('closeButton')!
    closeButton.addEventListener('click', () =>
        dialogBackGround.classList.add('hidden')
    )
    const createTripForm = document.getElementById('createTrip')
    createTripForm?.addEventListener('submit', (event) =>
        event.preventDefault()
    )
}
