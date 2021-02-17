import { html } from 'lit-html'

const htmlInsert = (title: string) =>
    html`<div>
        <h1>${title}</h1>
        <b>This is a nice place ${(20 / 3).toFixed(2)}</b>
    </div>`

export { htmlInsert }
