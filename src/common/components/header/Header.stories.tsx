import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './Header'

const meta = {
  component: Header,
  parameters: {
    layout: 'centered',
  },
  title: 'Component/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderIsAuthFalse: Story = {
  args: {
    isAuth: false,
  }
}
