import * as React from 'react'

import { PinOutline } from '@/assets/icons'
import { TextField, cn } from '@/common'
import { useCityAutocomplete } from '@/features/createPost'
import { observer } from 'mobx-react-lite'

export const CityAutocomplete = observer(() => {
  const {
    focusedIndex,
    handleKeyDown,
    location,
    onLocationChange,
    onSelectCity,
    query,
    suggestions,
    suggestionsListRef,
    t,
  } = useCityAutocomplete()

  return (
    <span className={'relative'}>
      <TextField
        className={'autocomplete-input'}
        label={'Add location'}
        onChange={onLocationChange}
        onKeyDown={handleKeyDown}
        placeholder={'Enter city name...'}
        value={location[0] ?? query}
      />
      {suggestions.length > 0 && (
        <ul
          className={
            'absolute top-16 left-0 max-h-24 overflow-y-auto m-0 pl-3 pr-8 py-2 bg-opacity-50 bg-dark-500 rounded-sm border border-dark-100 text-light-900'
          }
          ref={suggestionsListRef}
        >
          {suggestions.map((city, index) => (
            <li
              className={cn(
                'hover:text-accent-500',
                index === focusedIndex ? 'text-accent-500' : ''
              )}
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
