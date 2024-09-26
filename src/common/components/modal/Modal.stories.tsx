import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Modal'

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

            {/* <div className='p-3'>DIALOG-CONTENT</div> */}

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
