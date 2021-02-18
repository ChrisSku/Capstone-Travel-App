import { render } from 'lit-html'
import { loader } from './ts/pageLoader'
const home = () => import('./ts/home')
const bestPlaces = () => import('./ts/bestPlaces')
const savedPlaces = () => import('./ts/savedPlaces')

import './styles/base.scss'
import './styles/header.scss'
import './styles/loader.scss'

let path: string = window.location.pathname

const main = document.querySelector('main')!
const navLinks = document.getElementsByClassName('nav-container')

function setActiveNav() {
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].getAttribute('href') === path
            ? navLinks[i].classList.add('active')
            : navLinks[i].classList.remove('active')
    }
}

function loadPage() {
    render(loader(), main)
    path = window.location.pathname
    setActiveNav()
    if (path.startsWith('/best-places'))
        return bestPlaces().then((it) => render(it.init(), main))
    if (path.startsWith('/saved-places'))
        return savedPlaces().then((it) => render(it.init(), main))
    home().then((it) => it.init())
}

function movePage(link: string) {
    if (path !== link || path === '/') {
        history.pushState({}, link.substr(1), link)
        loadPage()
    }
}

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', () =>
        movePage(navLinks[i].getAttribute('href')!)
    )
}

window.onpopstate = loadPage
loadPage()
