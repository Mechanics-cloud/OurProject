import type { Meta, StoryObj } from '@storybook/react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common'

const meta = {
  component: Dialog,

  tags: ['autodocs'],
  title: 'Component/Modal',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const BasicModal: Story = {
  render: () => {
    return (
      <>
        <Dialog>
          <DialogTrigger>
            <Button
              className={'w-full'}
              type={'button'}
            >
              Click me!
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title in Header</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Dialog description dialog description dialog description.
            </DialogDescription>
            <DialogFooter>
              <Button
                className={'w-full'}
                type={'button'}
              >
                Footer for button
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}
export const ModalWithoutCross: Story = {
  render: () => {
    return (
      <>
        <Dialog>
          <DialogTrigger>
            <Button
              className={'w-full'}
              type={'button'}
            >
              Click me!
            </Button>
          </DialogTrigger>
          <DialogContent crossOff>
            <DialogHeader>
              <DialogTitle>Title in Header</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Dialog description dialog description dialog description.
            </DialogDescription>
            <DialogFooter>
              <Button
                className={'w-full'}
                type={'button'}
              >
                Footer for button
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}
