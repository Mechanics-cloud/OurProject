import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

import { SelectItem, cn, useTranslation } from '@/common'
import { FormSelect } from '@/common/form/FormSelect'
import { useFetchLocations } from '@/features/profile'

type Props<T extends FieldValues> = {
  control: Control<T>
  isTablet: boolean
}
export const SelectCountryAndCity = <T extends FieldValues>({
  control,
  isTablet,
}: Props<T>) => {
  const { t } = useTranslation()
  const { cities, countriesData, countryValue, loading } =
    useFetchLocations(control)

  return (
    <div className={cn('flex gap-6', isTablet && 'flex-col')}>
      <FormSelect
        className={'w-full'}
        control={control}
        disabled={loading}
        label={t.profileInputs.country}
        name={'country' as Path<T>}
        placeholder={t.profileInputs.placeholders.country}
      >
        {countriesData?.map((country) => (
          <SelectItem
            key={country.country}
            value={country.country}
          >
            {country.country}
          </SelectItem>
        ))}
      </FormSelect>
      <FormSelect
        className={'w-full'}
        control={control}
        disabled={!countryValue || loading}
        label={t.profileInputs.city}
        name={'city' as Path<T>}
        placeholder={t.profileInputs.placeholders.city}
      >
        {cities?.map((city) => (
          <SelectItem
            key={city}
            value={city}
          >
            {city}
          </SelectItem>
        ))}
      </FormSelect>
    </div>
  )
}
