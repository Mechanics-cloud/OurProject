import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '@/common/components/checkbox'

const meta = {
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxExample: Story = {
  args: {
    checked: true,
    disabled: true,
    id: 'checkbox',
    label: 'Check-box',
  },
}

export const CheckboxExample2: Story = {}
