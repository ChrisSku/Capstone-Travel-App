import {
  addEventListenerById,
  getInputById,
  startDateInput,
  endDateInput,
  getDefaultEndDate,
  converDateToSring
} from './helperFunctions'
import { html, render } from 'lit-html'
import {
  getSavedTripNames,
  saveTripName,
  saveTripLocationByName
} from './apiHandler'
import '../styles/tripDialog.scss'

const create = () => {
  const dialogTemplate = `<div class="dialog-background hidden" id="dialogBackGround"></div>`
  document.body.insertAdjacentHTML('beforeend', dialogTemplate)
  return document.getElementById('dialogBackGround')!
}

const addEvents = (dialog: HTMLElement) => {
  dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target === dialog) closeDialog()
  })
  addEventListenerById('saveButton', 'click', saveTrip)
  addEventListenerById('closeButton', 'click', closeDialog)
  addEventListenerById('createTrip', 'submit', updateTripNames)
  addEventListenerById('tripNameContainer', 'click', enableSaveButton)
}

const enableSaveButton = (event: MouseEvent) =>
  event.target instanceof HTMLInputElement &&
  document.getElementById('saveButton')?.classList.remove('disabled')

const closeDialog = () =>
  document.getElementById('dialogBackGround')?.classList.add('hidden')

const getTripNames = async () => {
  const savedTrip = (item: string) => {
    const id = item.replace(' ', '-')
    return html`
      <input type="radio" id="${id}" name="savedTrips" value="${item}" />
      <label for="${id}">${item}</label>
    `
  }
  return (await getSavedTripNames()).map(savedTrip)
}

async function showDialog(location: string, dialog: HTMLElement) {
  const startDate = startDateInput()?.value || converDateToSring(new Date())
  const endDate = endDateInput()?.value || getDefaultEndDate
  const content = html`<div class="trip-dialog" id="tripDialog">
    <h3>Add <span id="locationDialog">${location}</span> to your Trips</h3>
    <div class="trip-data">
      <label for="startDateDialog">Start Date</label>
      <input type="date" id="startDateDialog" value="${startDate}" />
      <label for="endDateDialog">End Date</label>
      <input type="date" id="endDateDialog" value="${endDate}" />
    </div>
    <div class="trip-names">
      <h4>Your Saved Trips:</h4>
      <div id="tripNameContainer"></div>
      <form id="createTrip">
        <input id="createTripText" placeholder="Create new Trip" />
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

const renderTripNames = async () => {
  render(await getTripNames(), document.getElementById('tripNameContainer')!)
}

async function updateTripNames(event: Event) {
  event.preventDefault()
  const value = getInputById('createTripText').value
  if (!value) return
  await saveTripName(value.trim())
  await renderTripNames()
}

function saveTrip() {
  const saveButtton = document.getElementById('saveButton')
  if (saveButtton?.classList.contains('disabled')) return
  const startDate = getInputById('startDateDialog').value
  const endDate = getInputById('endDateDialog').value
  const location = document.getElementById('locationDialog')?.innerText
  const data = { location, startDate, endDate }
  const radioTripInputs = Array.from(
    document.querySelectorAll("[name='savedTrips']")
  )
  const checkedValue = radioTripInputs.find(
    (it: HTMLInputElement) => it.checked
  ) as HTMLInputElement
  saveTripLocationByName(checkedValue.value, data)
  closeDialog()
}

export async function open(location: string) {
  const exists = document.getElementById('dialogBackGround')
  const dialog = exists || create()
  await showDialog(location, dialog)
  if (!exists) addEvents(dialog)
  await renderTripNames()
}
