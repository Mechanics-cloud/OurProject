import { Meta, StoryObj } from '@storybook/react'

import { SideBar } from './SideBar'

const meta = {
  component: SideBar,

  tags: ['autodocs'],
  title: 'Component/SideBar',
} satisfies Meta<typeof SideBar>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
