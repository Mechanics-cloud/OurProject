import type { Meta, StoryObj } from '@storybook/react'

import { RegistrationResult } from '@/common'

const meta = {
  component: RegistrationResult,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/RegistrationResult',
} satisfies Meta<typeof RegistrationResult>

export default meta
type Story = StoryObj<typeof meta>

export const BasicCard: Story = {
  args: {
    children: 'Image and button or something',
    text: 'Text',
    title: 'Title',
  },
}
