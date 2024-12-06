import type { Meta, StoryObj } from '@storybook/react'

import { Device } from './Device'

const meta = {
  component: Device,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Device',
} satisfies Meta<typeof Device>

export default meta
type Story = StoryObj<typeof meta>

export const CurrentDevice: Story = {
  args: {
    browserName: 'Chrome',
    ip: '22.345.345.12',
  },
}

export const ActiveSession: Story = {
  args: {
    browserName: 'Chrome',
    ip: '22.345.345.12',
    lastActive: '22.09.2022',
  },
}
