import { useEffect, useState } from 'react'

import locationsApi, { CountryData } from '@/features/profile/api/locations.api'

export const useFetchLocations = () => {
  const [countriesData, setCountriesData] = useState<CountryData[] | null>(null)

  useEffect(() => {
    locationsApi.fetchCountries().then((res) => setCountriesData(res))
  }, [])

  return { countriesData }
}
