import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'

import { PinOutline } from '@/assets/icons'
import { TextField, useTranslation } from '@/common'
import { addPostPhotoStore } from '@/features/createPost'
import { CountryData, locationsApi } from '@/features/profile'
import { observer } from 'mobx-react-lite'

export const CityAutocomplete = observer(() => {
  const { t } = useTranslation()
  const addLocation = addPostPhotoStore.addLocation
  const clearLocation = addPostPhotoStore.clearLocation
  const location = addPostPhotoStore.location
  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [cityData, setCityData] = useState<CountryData[]>([])
  const [isCitySelected, setIsCitySelected] = useState<boolean>(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length > 0 && !isCitySelected) {
        const matchingCities: string[] = []

        cityData.forEach((country) => {
          matchingCities.push(
            ...country.cities.filter((city) =>
              city.toLowerCase().includes(query.toLowerCase())
            )
          )
        })
        setSuggestions(matchingCities)
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, cityData, isCitySelected])

  useEffect(() => {
    locationsApi.fetchCountries().then((res) => {
      setCityData(res)
    })
  }, [])

  const onSelectCity = (selectedCity: string) => {
    let country = ''

    for (let i = 0; i < cityData.length; i++) {
      cityData[i].cities.find((city) => {
        if (city === selectedCity) {
          country = cityData[i].country
        }
      })
      if (country) {
        break
      }
    }

    setQuery(selectedCity)
    addLocation(selectedCity, country)
    setIsCitySelected(true)
    setSuggestions([])
  }

  const onLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearLocation()
    setQuery(e.target.value)
    setIsCitySelected(false)
  }

  return (
    <span className={'relative'}>
      <TextField
        className={'autocomplete-input'}
        label={'Add location'}
        onChange={onLocationChange}
        placeholder={'Enter city name...'}
        value={location[0] ?? query}
      />
      {suggestions.length > 0 && (
        <ul
          className={
            'absolute top-16 left-0 max-h-24 overflow-y-auto m-0 pl-3 pr-8 py-2 bg-opacity-50 bg-dark-500 rounded-sm border border-dark-100 text-light-900'
          }
        >
          {suggestions.map((city) => (
            <li
              className={'hover:text-accent-500'}
              key={city}
              onClick={() => onSelectCity(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
      <PinOutline
        className={
          'w-6 h-6 absolute right-1.5 top-0 bottom-0 translate-y-[30px]'
        }
      />
    </span>
  )
})
