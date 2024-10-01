import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from '@/common'

const meta = {
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/RadioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { label: 'First item', value: 'one' },
  { label: 'Second item', value: 'two' },
]

export const BasicRadioGroup: Story = {
  args: {
    options,
  },
}
export const DisabledRadioGroup: Story = {
  args: {
    disabled: true,
    options,
  },
}
export const VerticalOrientationRadioGroup: Story = {
  args: {
    classNamesForGroup: 'flex flex-col items-start gap-4',
    options,
  },
}
