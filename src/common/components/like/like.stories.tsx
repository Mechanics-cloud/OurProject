import { Meta, StoryObj } from '@storybook/react'

import { Like } from './like'

const meta = {
  component: Like,
  parameters: {
    layout: 'centered',
  },
  title: 'Component/Like',
} satisfies Meta<typeof Like>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = {
  args: {
    active: true,
  },
}
