import type { Meta, StoryObj } from '@storybook/react'

import { UserMiniLink } from '@/common'

import Avatar from '/src/assets/images/image4.jpg'

const meta = {
  args: {
    avatarSrc: Avatar.src,
    name: 'John Doe',
    profileLink: '',
  },
  component: UserMiniLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/UserMiniLink',
} satisfies Meta<typeof UserMiniLink>

export default meta
type Story = StoryObj<typeof meta>

export const BasicCard: Story = {}
