import axios from 'axios'

class LocationsApi {
  constructor() {}
  public async fetchCountries(): Promise<CountryData[]> {
    return axios.get('/locations.json').then((res) => res.data)
  }
}

export type CountryData = {
  cities: string[]
  country: string
}

export default new LocationsApi()
