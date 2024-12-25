import * as React from 'react'

import { ScrollArea, Typography, useTranslation } from '@/common'
import { ClassicFiltersType, Slider, addPostStore } from '@/features/createPost'
import { classicSettingsData } from '@/features/createPost/model/constants'
import { observer } from 'mobx-react-lite'

export const ClassicFilters = observer(() => {
  const { t } = useTranslation()
  const currentSliderIndex = addPostStore.currentSliderIndex || 0
  const photos = addPostStore.photos.toArray
  const changeClassicFilterSetting =
    addPostStore.photos.toArray[currentSliderIndex].changeFilterSetting
  // const changeClassicFilterSetting = addPostStore.changeFilterSetting

  // const updateFilter = (filter: ClassicFiltersType, value: number) => {
  //   changeClassicFilterSetting(filter, value)
  // }

  return (
    <ScrollArea className={'md:h-[430px]'}>
      <div
        className={
          'grid grid-cols-[min-content_1fr] gap-x-5 gap-y-12 pt-14 px-[53px]'
        }
      >
        {classicSettingsData(t).map((setting, index) => (
          <React.Fragment key={index}>
            <Typography variant={'reg16'}>{setting.name}</Typography>
            <Slider
              className={setting.centered ? 'sliderCenter' : ''}
              max={setting.centered ? 3 : 1}
              min={0}
              onValueChange={(value) =>
                changeClassicFilterSetting(setting.field, value[0])
              }
              step={setting.centered ? 0.1 : 0.01}
              value={[photos[currentSliderIndex].filterSettings[setting.field]]}
            />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
})
