import type { Meta, StoryObj } from '@storybook/react'

import { Device } from '@/features/profile/settings/Device'

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
    deviceName: 'Chrome',
    deviceType: 'chrome',
    ip: '22.345.345.12',
  },
}

export const ActiveSession: Story = {
  args: {
    deviceName: 'Chrome',
    deviceType: 'mobile',
    ip: '22.345.345.12',
    lastActive: '22.09.2022',
  },
}
