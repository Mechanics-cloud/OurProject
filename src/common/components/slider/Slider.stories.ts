import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from '@/common/components/slider/Slider'

const meta = {
  args: {
    className: 'w-96',
    defaultValue: [33],
    max: 100,
    step: 1,
  },
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const BasicSlider: Story = {}
