import type { Meta, StoryObj } from '@storybook/react'

import { Stub } from './Stub'

const meta = {
  component: Stub,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Stub',
} satisfies Meta<typeof Stub>

export default meta
type Story = StoryObj<typeof meta>

export const noImages: Story = {
  args: {
    alt: 'No user post image',
    className: '',
    title:
      'Failed to display post photos. Please contact support or try again later!',
  },
}
