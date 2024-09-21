import { TextArea } from '@/common/components'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/TextArea',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Label',
    placeholder: 'Placeholder',
  },
}

export const Error: Story = {
  args: {
    error: 'Error',
    label: 'Label',
    placeholder: 'Placeholder',
  },
}

export const Required: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    required: true,
  },
}
