import { aside } from './helperFunctions'
import { html, render } from 'lit-html'
import { renderTripList } from './tripData'

import '../styles/best-places.scss'

const BACKEND_BASE_URL = 'http://localhost:3000'

const asideTemplate = html`<div class="popular-header">Popular Places</div>
  <div class="popular-container" id="popularContainer"></div>`

export const renderBestPlaces = async () => {
  render(asideTemplate, aside())
  const bestPlaces: string[] = await fetch(
    BACKEND_BASE_URL + '/trips/best-places'
  ).then(it => it.json())
  const popularContainer = document.getElementById('popularContainer')!
  if (!popularContainer.textContent?.includes('Madrid'))
    renderTripList(bestPlaces, popularContainer)
}
