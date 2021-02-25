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

const getHashSave = () => {
  const hashes = location.hash.substr(1).split('=')
  const hashDic: { [key: string]: string } = {}
  for (let i = 0; i < hashes.length; i += 2) {
    hashDic[hashes[i]] = decodeURIComponent(hashes[i + 1])
  }
  return hashDic
}

export {
  getInputById,
  addEventListenerById,
  converDateToSring,
  converStringToLocaledDate,
  main,
  aside,
  getHashSave,
  startDateInput,
  endDateInput,
  getDefaultEndDate
}
