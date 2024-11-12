import { useEffect, useState } from 'react'
import { Control, FieldValues, Path, useWatch } from 'react-hook-form'

import locationsApi, {
  CountryData,
} from '@/features/profile/settings/generalInfo/api/locations.api'

export const useFetchLocations = <T extends FieldValues>(
  control: Control<T>
) => {
  const [countriesData, setCountriesData] = useState<CountryData[] | null>(null)
  const [cities, setCities] = useState<null | string[]>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const countryValue = useWatch({
    control,
    name: 'country' as Path<T>,
  })

  useEffect(() => {
    locationsApi.fetchCountries().then((res) => {
      setCountriesData(res)
      setLoading(false)
    })
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

  return { cities, countriesData, countryValue, loading }
}
