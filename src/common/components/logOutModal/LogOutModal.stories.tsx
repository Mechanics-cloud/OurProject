import { Button } from '@/common'
import { LogOutModal } from '@/common/components/logOutModal/LogOutModal'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: LogOutModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/LogOutModal',
} satisfies Meta<typeof LogOutModal>

export default meta

type Story = StoryObj<typeof meta>

export const BaseLogOutModal: Story = {
  args: {
    logOutModalHandler: () => {
      alert('You are logged out!')
    },
    triggerButton: <Button type={'button'}>Log out</Button>,
  },
}
