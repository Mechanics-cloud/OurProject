import type { Meta, StoryObj } from '@storybook/react'

import { Menu } from './Menu'

const meta = {
  component: Menu,
  decorators: [
    (Story) => (
      <div style={{ height: '667px', width: '375px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Menu',
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const BasicMenu: Story = {}
