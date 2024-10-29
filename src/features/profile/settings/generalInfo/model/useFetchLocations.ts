import { useEffect, useState } from 'react'
import { Control, useWatch } from 'react-hook-form'

import { FormData } from '@/features/profile/settings/generalInfo'
import locationsApi, {
  CountryData,
} from '@/features/profile/settings/generalInfo/api/locations.api'

export const useFetchLocations = (control: Control<FormData>) => {
  const [countriesData, setCountriesData] = useState<CountryData[] | null>(null)
  const [cities, setCities] = useState<null | string[]>([])

  const countryValue = useWatch({
    control,
    name: 'country',
  })

  useEffect(() => {
    locationsApi.fetchCountries().then((res) => setCountriesData(res))
  }, [])

  useEffect(() => {
    if (countryValue) {
      const filteredCountryData = countriesData?.filter(
        (country) => country.country === countryValue
      )

      if (filteredCountryData) {
        setCities(filteredCountryData[0].cities)
      }
    }
  }, [countriesData, countryValue])

  return { cities, countriesData, countryValue }
}
