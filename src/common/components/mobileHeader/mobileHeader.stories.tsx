import type { Meta, StoryObj } from '@storybook/react'

import { MobileHeader } from 'src/common/components/mobileHeader/MobileHeader'

const meta = {
  component: MobileHeader,
  parameters: {
    layout: 'centered',
  },
  title: 'Component/MobileHeader',
} satisfies Meta<typeof MobileHeader>

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
