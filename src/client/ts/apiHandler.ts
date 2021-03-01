const BACKEND_BASE_URL = 'http://localhost:3000'
interface LocationData {
  name: string
  countryName: string
  lat: string
  lng: string
  population: number
  countryCode: string
  fclName: string
}

interface WeatherIcon {
  icon: string
  description: string
}

interface DateWeatherData {
  clouds: number
  max_temp: number
  temp: number
  min_temp: number
  datetime: string
  weather: WeatherIcon
}

interface WeatherData {
  timezone: string
  data: DateWeatherData[]
}

interface PictureData {
  webformatURL: string
  largeImageURL: string
  previewURL: string
}

type Trip = {
  id: number
  location: string
  startDate: string
  endDate: string
}

const locationDataUrl = `${BACKEND_BASE_URL}/trips/locations?location=`
const getLocationData = (location: string): Promise<LocationData> =>
  fetch(locationDataUrl + location).then(it => it.json())

function getWeatherData(locationData: LocationData): Promise<WeatherData> {
  const { lat, lng } = locationData
  const params = new URLSearchParams({ lat, lng })
  const url = `${BACKEND_BASE_URL}/trips/weather?${params}`
  return fetch(url).then(it => it.json())
}

function getEstimatedWeatherData(
  locationData: LocationData,
  date: string
): Promise<WeatherData> {
  const { lat, lng } = locationData
  const params = new URLSearchParams({ lat, lng, date })
  const url = `${BACKEND_BASE_URL}/trips/weather/history?${params}`
  return fetch(url).then(it => it.json())
}

function getPictures({ name, countryName }: any): Promise<PictureData[]> {
  const params = new URLSearchParams({ name, countryName })
  const url = `${BACKEND_BASE_URL}/trips/pictures?${params}`
  return fetch(url).then(it => it.json())
}

const savedTripUrl = `${BACKEND_BASE_URL}/trips/saved`

const getSavedTrips = (): Promise<Trip[]> => {
  return fetch(savedTripUrl).then(it => it.json())
}

const createTrip = (data: Trip) =>
  fetch(savedTripUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })

const deleteTripById = (id: number) => {
  return fetch(`${savedTripUrl}/${id}`, { method: 'DELETE' })
}

export {
  LocationData,
  WeatherData,
  DateWeatherData,
  PictureData,
  Trip,
  getLocationData,
  getWeatherData,
  getPictures,
  createTrip,
  getSavedTrips,
  deleteTripById,
  getEstimatedWeatherData
}
