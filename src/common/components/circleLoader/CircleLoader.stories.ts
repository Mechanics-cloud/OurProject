import type { Meta, StoryObj } from '@storybook/react'

import { CircleLoader } from './CircleLoader'

const meta = {
  component: CircleLoader,
  tags: ['autodocs'],

  title: 'Component/CircleLoader',
} satisfies Meta<typeof CircleLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    className: 'w-full min-h-[500px] flex items-center justify-center',
  },
}
