import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from '@/common'

const meta = {
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Skeleton',
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const RoundSkeleton: Story = {
  args: {
    className: 'w-[40px] h-[40px] rounded-full',
  },
}

export const SquareSkeleton: Story = {
  args: {
    className: 'w-[100px] h-[20px] rounded-sm',
  },
}
