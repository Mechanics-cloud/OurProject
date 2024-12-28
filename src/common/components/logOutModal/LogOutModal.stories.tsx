import * as React from 'react'

import { LogOut } from '@/assets/icons'
import { LinkWithIcon, Typography, useModal } from '@/common'
import { LogOutModal } from '@/common/components/logOutModal/LogOutModal'
import { generalStore } from '@/core/store'
import { Meta } from '@storybook/react'

const meta = {
  component: LogOutModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/LogOutModal',
} satisfies Meta<typeof LogOutModal>

export default meta

export const BaseLogOutModal = () => {
  const {
    isModalOpen: isLogOutModalOpen,
    onModalClose: onLogOutModalClose,
    openModal: openLogOutModal,
  } = useModal()

  return (
    <>
      <LinkWithIcon
        ActiveIcon={LogOut}
        DefaultIcon={LogOut}
        as={'button'}
        onClick={openLogOutModal}
      >
        <Typography variant={'reg14'}>Log out</Typography>
      </LinkWithIcon>
      <LogOutModal
        logOutModalHandler={onLogOutModalClose}
        onClose={onLogOutModalClose}
        open={isLogOutModalOpen}
        userEmail={generalStore.user?.email ?? ''}
      />
    </>
  )
}
