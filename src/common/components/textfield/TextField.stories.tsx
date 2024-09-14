import { Meta, StoryObj } from '@storybook/react'
import { TextField } from '@/common/components'

const meta: Meta<typeof TextField> = {
  title: 'Component/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    disabled: true,
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
    value: '123456',
    label: 'Label',
    placeholder: 'Placeholder',
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    label: 'Label',
    placeholder: 'Input search',
    type: 'search',
  },
}

export const asTextArea: Story = {
  args: {
    label: 'Label',
    as: 'textarea',
  },
}
