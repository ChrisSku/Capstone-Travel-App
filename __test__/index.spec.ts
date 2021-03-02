const body = `<header>
<div class="logo">
  <img src="TravelIcon.svg" alt="Backpack-ICON" />
  <h1>Backpack</h1>
</div>
<nav>
  <ul>
    <li class="nav-item" id="homeLink" href="/">
      <div>Home</div>
    </li>
    <li class="nav-item" id="savedPlacesLink" href="/saved-places.html">
      <div>Your saved Trips</div>
    </li>
  </ul>
</nav>
</header>
<main></main>
<aside></aside>
<footer>
© 2021 Backpack
<span
  >Pictures from
  <img
    id="pixabaylogo"
    src="pixabaylogo.svg"
    alt="picture are from pixabay.com"
/></span>
</footer>`
document.body.innerHTML = body

import '../src/client/index'

describe('main side has loaded', () => {
  it('form Search bar has loaded', () => {
    const main = document.querySelector('main')?.innerHTML
    expect(main).toContain('<form id="searchBar">')
    expect(main).toContain(
      '<input required="" id="placeInput" placeholder="Search Country" type="">'
    )
    expect(main).toContain(
      '<input required="" id="startDateInput" placeholder="" type="date">'
    )
    expect(main).toContain(
      '<input required="" id="endDateInput" placeholder="" type="date">'
    )
    expect(main).toContain(
      '<input type="submit" id="submitSearch" value="SEARCH">'
    )
  })
})
