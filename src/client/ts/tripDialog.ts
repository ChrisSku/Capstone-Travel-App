import * as _ from './helperFunctions'
import { html, render } from 'lit-html'
import { createTrip, Trip } from './apiHandler'
import '../styles/tripDialog.scss'

const close = () =>
  document.getElementById('dialogBackGround')?.classList.add('hidden')

const create = () => {
  const dialogTemplate = `<div class="dialog-background hidden" id="dialogBackGround"></div>`
  document.body.insertAdjacentHTML('beforeend', dialogTemplate)
  return document.getElementById('dialogBackGround')!
}

const addEvents = (dialog: HTMLElement) => {
  dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target === dialog) close()
  })
  _.addEventListenerById('saveButton', 'click', save)
  _.addEventListenerById('closeButton', 'click', close)
}

const showDialog = async (location: string, dialog: HTMLElement) => {
  const startDate = _.startDateInput()?.value || _.converDateToSring(new Date())
  const endDate = _.endDateInput()?.value || _.getDefaultEndDate
  const content = html`<div class="trip-dialog" id="tripDialog">
    <h3>Add <span id="locationDialog">${location}</span> to your Trips</h3>
    <div class="trip-data">
      <label for="startDateDialog">Start Date</label>
      <input type="date" id="startDateDialog" value="${startDate}" />
      <label for="endDateDialog">End Date</label>
      <input type="date" id="endDateDialog" value="${endDate}" />
    </div>
    <div class="dialog-actions">
      <button id="closeButton">CLOSE</button>
      <button id="saveButton" class="primary">SAVE</button>
    </div>
  </div>`
  render(content, dialog)
  dialog.classList.remove('hidden')
}

const save = () => {
  const saveButtton = document.getElementById('saveButton')
  if (saveButtton?.classList.contains('disabled')) return
  const startDate = _.getInputById('startDateDialog').value
  const endDate = _.getInputById('endDateDialog').value
  const location = document.getElementById('locationDialog')?.innerText ?? ''
  const data: Trip = { id: -1, location, startDate, endDate }
  createTrip(data)
  close()
}

export const open = async (location: string) => {
  const exists = document.getElementById('dialogBackGround')
  const dialog = exists || create()
  await showDialog(location, dialog)
  if (!exists) addEvents(dialog)
}
