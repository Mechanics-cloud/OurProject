import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from '@/common/components/loader/Loader'

const meta = {
  component: Loader,
  tags: ['autodocs'],
  title: 'Component/Loader',
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const BasicLoader: Story = {}
