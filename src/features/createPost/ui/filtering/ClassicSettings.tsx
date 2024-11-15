import * as React from 'react'

import { Typography, useTranslation } from '@/common'
import { Slider } from '@/features/createPost'

export const ClassicSettings = () => {
  const { t } = useTranslation()

  return (
    <div
      className={
        'grid grid-cols-[min-content_1fr] gap-x-5 gap-y-12 pt-10 px-[53px]'
      }
    >
      <Typography variant={'reg16'}>Brightness</Typography>
      <Slider
        className={'sliderCenter'}
        max={50}
        min={-50}
        step={1}
        value={[0]}
      />

      <Typography variant={'reg16'}>Contrast</Typography>
      <Slider
        className={'sliderCenter'}
        max={50}
        min={-50}
        step={1}
        value={[0]}
      />
      <Typography variant={'reg16'}>Saturation</Typography>
      <Slider
        className={'sliderCenter'}
        max={50}
        min={-50}
        step={1}
        value={[0]}
      />
      <Typography variant={'reg16'}>Temperature</Typography>
      <Slider
        className={'sliderCenter'}
        max={50}
        min={-50}
        step={1}
        value={[0]}
      />
      <Typography variant={'reg16'}>Sepia</Typography>
      <Slider
        max={50}
        min={0}
        step={1}
        value={[0]}
      />
      <Typography variant={'reg16'}>Grayscale</Typography>
      <Slider
        max={100}
        min={0}
        step={1}
        value={[0]}
      />
    </div>
  )
}
