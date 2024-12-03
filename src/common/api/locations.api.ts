import axios from 'axios'

import { CommonEndpoints } from './common.endpoints'

class LocationsApi {
  constructor() {}
  public fetchCountries(): Promise<CountryData[]> {
    return axios.get(CommonEndpoints.locations).then((res) => res.data)
  }
}

export type CountryData = {
  cities: string[]
  country: string
}

export const locationsApi = new LocationsApi()
