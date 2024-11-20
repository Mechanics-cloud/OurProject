import * as React from 'react'

import { Typography } from '@/common'
import { ClassicFiltersType, Slider, addPostStore } from '@/features/createPost'
import { classicSettingsData } from '@/features/createPost/model/constants'
import { observer } from 'mobx-react-lite'

export const ClassicFilters = observer(() => {
  const photos = addPostStore.photos
  const changeClassicFilterSetting = addPostStore.changeClassicFilterSetting
  const currentSliderIndex = addPostStore.currentSliderIndex || 0

  const updateFilter = (filter: ClassicFiltersType, value: number) => {
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
