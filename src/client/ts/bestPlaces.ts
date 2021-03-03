import { aside } from './helperFunctions'
import { html, render } from 'lit-html'
import { renderTripList } from './tripData'
import { getBestPlaces } from './apiHandler'

import '../styles/best-places.scss'

const asideTemplate = html`<div class="popular-header">Popular Places</div>
  <div class="popular-container" id="popularContainer"></div>`

/**
 * retives the best places of the Server and displayes it on the UI
 */

export const renderBestPlaces = async () => {
  render(asideTemplate, aside())
  const bestPlaces: string[] = await getBestPlaces()
  const popularContainer = document.getElementById('popularContainer')!
  if (!popularContainer.textContent?.includes('Madrid'))
    renderTripList(bestPlaces, popularContainer)
}
