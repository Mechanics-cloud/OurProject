import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { useTranslation } from '@/common'
import { addPostStore } from '@/features/createPost'
import { CountryData, locationsApi } from '@/features/profile'

export const useCityAutocomplete = () => {
  const { t } = useTranslation()
  const addLocation = addPostStore.addLocation
  const clearLocation = addPostStore.clearLocation
  const location = addPostStore.location
  const [query, setQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [cityData, setCityData] = useState<CountryData[]>([])
  const [isCitySelected, setIsCitySelected] = useState<boolean>(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const suggestionsListRef = useRef<HTMLUListElement | null>(null)

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

  const handleMouseMove = (event: MouseEvent) => {
    setFocusedIndex(-1)
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
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
    setFocusedIndex(-1)
  }

  const onLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearLocation()
    setQuery(e.target.value)
    setIsCitySelected(false)
    setFocusedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      if (focusedIndex < suggestions.length - 1) {
        setFocusedIndex(focusedIndex + 1)
      }
    } else if (e.key === 'ArrowUp') {
      if (focusedIndex > 0) {
        setFocusedIndex(focusedIndex - 1)
      }
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
        onSelectCity(suggestions[focusedIndex])
      }
    }
  }

  useEffect(() => {
    if (focusedIndex >= 0 && suggestionsListRef.current) {
      const focusedElement = suggestionsListRef.current.children[
        focusedIndex
      ] as HTMLElement

      focusedElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [focusedIndex, suggestions])

  return {
    focusedIndex,
    handleKeyDown,
    location,
    onLocationChange,
    onSelectCity,
    query,
    suggestions,
    suggestionsListRef,
    t,
  }
}
