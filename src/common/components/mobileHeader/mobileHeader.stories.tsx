import type { Meta, StoryObj } from '@storybook/react'

import { mobileHeader } from './mobileHeader'

const meta = {
  component: mobileHeader,
  parameters: {
    layout: 'centered',
  },
  title: 'Component/mobileHeader',
} satisfies Meta<typeof mobileHeader>

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
