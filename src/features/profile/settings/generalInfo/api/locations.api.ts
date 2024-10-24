import { ProfileEndpoints } from '@/features/profile/settings/generalInfo/api/profile.endpoints'
import axios from 'axios'

class LocationsApi {
  constructor() {}
  public async fetchCountries(): Promise<CountryData[]> {
    return axios.get(ProfileEndpoints.locations).then((res) => res.data)
  }
}

export type CountryData = {
  cities: string[]
  country: string
}

export default new LocationsApi()
