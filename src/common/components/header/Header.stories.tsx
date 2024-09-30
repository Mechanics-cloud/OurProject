import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/common'

const meta = {
  component: Header,
  parameters: {
    layout: 'centered',
  },
  title: 'Component/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderIsAuthorizedUzer: Story = {
  args: {
    isAuth: true,
  },
}

export const HeaderIsUnauthorizedUser: Story = {
  args: {
    isAuth: false,
  },
}
