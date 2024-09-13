import type { Meta, StoryObj } from '@storybook/react'

import { Calendar } from './Calendar'

const meta = {
  component: Calendar,
  tags: ['autodocs'],

  title: 'Component/Calendar',
} satisfies Meta<typeof Calendar>

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
