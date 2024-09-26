import { SideBar } from '@/common'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: SideBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/SideBar',
} satisfies Meta<typeof SideBar>

export default meta

type Story = StoryObj<typeof meta>

export const SideBarNav: Story = {
  args: {},
}
