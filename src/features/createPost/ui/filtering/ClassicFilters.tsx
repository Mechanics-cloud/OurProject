import * as React from 'react'
import { useState } from 'react'

import { Typography } from '@/common'
import {
  ClassicFiltersType,
  FiltersState,
  Slider,
  addPostStore,
  classicSettingsData,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

export const ClassicFilters = observer(() => {
  // const [classicFilter, setClassicFilter] = useState<FiltersState>({
  //   brightness: 1,
  //   contrast: 1,
  //   grayscale: 0,
  //   saturate: 1,
  //   sepia: 0,
  // })
  const photos = addPostStore.photos
  const changeClassicFilterSetting = addPostStore.changeClassicFilterSetting
  const currentSliderIndex = addPostStore.currentSliderIndex || 0

  const updateFilter = (filter: ClassicFiltersType, value: number) => {
    // setClassicFilter((prevFilters) => ({
    //   ...prevFilters,
    //   [filter]: value,
    // }))
    // const filterForImage = `contrast(${classicFilter.contrast}) brightness(${classicFilter.brightness}) grayscale(${classicFilter.grayscale}) saturate(${classicFilter.saturate}) sepia(${classicFilter.sepia})`

    changeClassicFilterSetting(currentSliderIndex, filter, value)
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
            max={setting.centered ? 3 : 1}
            min={0}
            onValueChange={(value) => updateFilter(setting.field, value[0])}
            step={setting.centered ? 0.1 : 0.01}
            value={[
              photos[currentSliderIndex].classicFilterSettings[setting.field],
            ]}
          />
        </React.Fragment>
      ))}
    </div>
  )
})
