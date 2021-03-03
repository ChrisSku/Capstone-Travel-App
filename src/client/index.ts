/*
  The index.ts file is the anchor point of the clientside code.
  It includes a basic router for the main (/) and the saved-places (/saved-places) sides
*/

import { render } from 'lit-html'
import { loader } from './ts/pageLoader'
const home = () => import('./ts/home')
const savedPlaces = () => import('./ts/savedPlaces')

import './styles/base.scss'
import './styles/header.scss'
import './styles/loader.scss'

const main = document.querySelector('main')!
const navbar = document.querySelector('nav')
let path: string = location.pathname

// return the basePath on first time loading
const basePath = (() => {
  let paths = location.pathname.split('/')
  paths.pop()
  return paths.join('/')
})()

/**
 * This is the router which will change the content of the side
 * depending on the location
 */
function router() {
  render(loader(), main)
  path = location.pathname
  setActiveNav()
  if (path.endsWith('/saved-places.html'))
    return savedPlaces().then(it => it.init())
  home().then(it => it.init())
}

// add to one of the Navbar items the active class
function setActiveNav() {
  const navItems = navbar?.querySelectorAll('.nav-item')!
  for (let i = 0; i < navItems.length; i++) {
    basePath + navItems[i].getAttribute('href') === path
      ? navItems[i].classList.add('active')
      : navItems[i].classList.remove('active')
  }
}

function movePage(link: string) {
  if (path !== link || path === '/') {
    history.pushState({}, link.substr(1), basePath + link)
    router()
  }
}

navbar!.addEventListener('click', (e: MouseEvent) => {
  e.composedPath()
    .filter(it => it instanceof HTMLLIElement)
    .forEach((it: HTMLLIElement) => movePage(it.getAttribute('href')!))
})
document
  .getElementById('pixabaylogo')
  ?.addEventListener('click', () => window.open('https://pixabay.com'))

/**
 * overrides the onpopstate that the browser should not reload
 * the whole page only the content -> an SPA approache
 */
window.onpopstate = router
// opens current content
router()
