import * as React from 'react'
import { useState } from 'react'

import { Typography } from '@/common'
import {
  ClassicFiltersType,
  FiltersState,
  Slider,
  classicSettingsData,
} from '@/features/createPost'

export const ClassicFilters = () => {
  const [classicFilter, setClassicFilter] = useState<FiltersState>({
    brightness: 0,
    contrast: 0,
    grayscale: 0,
    saturate: 0,
    sepia: 0,
  })

  const updateFilter = (filter: ClassicFiltersType, value: number) => {
    setClassicFilter((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }))
  }

  return (
    <div
      className={
        'grid grid-cols-[min-content_1fr] gap-x-5 gap-y-12 pt-14 px-[53px]'
      }
    >
      {classicSettingsData.map((setting, index) => (
        <React.Fragment key={index}>
          <Typography variant={'reg16'}>{setting.name}</Typography>
          <Slider
            className={setting.centered ? 'sliderCenter' : ''}
            max={setting.centered ? 50 : 100}
            min={setting.centered ? -50 : 0}
            onValueChange={(value) => updateFilter(setting.field, value[0])}
            step={1}
            value={[classicFilter[setting.field]]}
          />
        </React.Fragment>
      ))}
    </div>
  )
}
