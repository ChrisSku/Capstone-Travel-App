import { render } from 'lit-html'
import { loader } from './ts/pageLoader'
const home = () => import('./ts/home')
const bestPlaces = () => import('./ts/bestPlaces')
const savedPlaces = () => import('./ts/savedPlaces')

import './styles/base.scss'
import './styles/header.scss'
import './styles/loader.scss'

const basePath = (() => {
    let paths = window.location.pathname.split('/')
    paths.pop()
    return paths.join('/')
})()

let path: string = window.location.pathname

const main = document.querySelector('main')!
const navbar = document.querySelector('nav')

function setActiveNav() {
    const navItems = navbar?.querySelectorAll('.nav-item')!
    for (let i = 0; i < navItems.length; i++) {
        basePath + navItems[i].getAttribute('href') === path
            ? navItems[i].classList.add('active')
            : navItems[i].classList.remove('active')
    }
}

function loadPage() {
    render(loader(), main)
    path = window.location.pathname
    setActiveNav()
    if (path.endsWith('/best-places.html'))
        return bestPlaces().then((it) => it.init())
    if (path.endsWith('/saved-places.html'))
        return savedPlaces().then((it) => it.init())
    home().then((it) => it.init())
}

function movePage(link: string) {
    if (path !== link || path === '/') {
        history.pushState({}, link.substr(1), basePath + link)
        loadPage()
    }
}

navbar!.addEventListener('click', (e: MouseEvent) => {
    e.composedPath()
        .filter((it) => it instanceof HTMLLIElement)
        .forEach((it: HTMLLIElement) => movePage(it.getAttribute('href')!))
})

window.onpopstate = loadPage
loadPage()

document
    .getElementById('pixabaylogo')
    ?.addEventListener('click', () => window.open('https://pixabay.com'))
