import { toast } from 'react-toastify'

import { toastPositions } from '@/common/components/toast/helpers'
import { Meta, StoryObj } from '@storybook/react'

import ToastContainer from './ToastContainer'

const meta: Meta<typeof ToastContainer> = {
  argTypes: {
    position: {
      control: { type: 'select' },
      options: toastPositions,
    },
  },
  component: ToastContainer,
  parameters: {
    layout: 'centered',
  },
  render: (args) => {
    const notifyError = () => toast.error('Error message')
    const notifySuccess = () => toast.success('Success message')

    return (
      <div className={'flex flex-col gap-10'}>
        <button
          onClick={notifyError}
          type={'button'}
        >
          Error!
        </button>
        <button
          onClick={notifySuccess}
          type={'button'}
        >
          Success!
        </button>
        <ToastContainer {...args} />
      </div>
    )
  },
  tags: ['autodocs'],
  title: 'Component/Toast',
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    icon: false,
    position: 'bottom-left',
  },
}

export const WithProgressBar: Story = {
  args: {
    hideProgressBar: false,
  },
}
