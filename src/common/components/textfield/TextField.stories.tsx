import { TextField } from '@/common/components'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/TextField',
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
export const Password: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'password',
    value: '123456',
  },
}
export const Search: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input search',
    type: 'search',
  },
}
