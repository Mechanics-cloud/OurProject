import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/common/components/card/Card'

const meta = {
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const BasicCard: Story = {
  args: {
    children: 'Basic Card',
  },
}
