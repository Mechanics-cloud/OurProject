import type { Meta, StoryObj } from '@storybook/react'

import { DatePickerWithRange } from './DatePicker'

const meta = {
  component: DatePickerWithRange,
  tags: ['autodocs'],

  title: 'Component/DatePicker',
} satisfies Meta<typeof DatePickerWithRange>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    mode: 'single',
  },
}
export const Range: Story = {
  args: {
    mode: 'range',
  },
}
