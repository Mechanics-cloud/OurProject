import type { Meta, StoryObj } from '@storybook/react'

import { Menu } from './Menu'

const meta = {
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Menu',
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const BasicMenu: Story = {}
