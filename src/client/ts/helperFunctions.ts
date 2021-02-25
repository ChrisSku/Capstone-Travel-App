const getInputById = (id: string) =>
    document.getElementById(id) as HTMLInputElement

const addEventListenerById = <K extends keyof HTMLElementEventMap>(
    id: string,
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions | undefined
): void =>
    document.getElementById(id)?.addEventListener(type, listener, options)

const converDateToSring = (date: Date) => date.toISOString().substring(0, 10)
const converStringToLocaledDate = (datetime: string) =>
    new Date(datetime).toLocaleDateString()

const main = () => document.querySelector('main')!
const aside = () => document.querySelector('aside')!
const startDateInput = () => getInputById('startDateInput')
const endDateInput = () => getInputById('endDateInput')

const getDefaultEndDate = (() => {
    const date = new Date()
    date.setDate(date.getDate() + 14)
    return converDateToSring(date)
})()

export {
    getInputById,
    addEventListenerById,
    converDateToSring,
    converStringToLocaledDate,
    main,
    aside,
    startDateInput,
    endDateInput,
    getDefaultEndDate
}
