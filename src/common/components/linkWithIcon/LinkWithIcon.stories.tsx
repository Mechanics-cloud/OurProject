import { Desktop } from '@/assets/icons/filledIcons'
import Chrome from '@/assets/icons/filledIcons/Chrome'
import { Meta, StoryObj } from '@storybook/react'
import Link from 'next/link'

import { LinkWithIcon } from './LinkWithIcon'

const meta = {
  args: {
    ActiveIcon: Chrome,
    DefaultIcon: Chrome,
    as: 'a',
    children: 'Chrome',
    disabled: false,
    href: '#',
  },
  component: LinkWithIcon,
  parameters: {
    layout: 'centered',
  },
  title: 'Component/LinkWithIcon',
} satisfies Meta<typeof LinkWithIcon>

export default meta

type Story = StoryObj<typeof meta>

export const LinkWithIconDefault: Story = {
  args: {
    ActiveIcon: Chrome,
    DefaultIcon: Chrome,
    as: 'a',
    children: 'Chrome',
    disabled: false,
    href: '#',
  },
}

export const ButtonWithIconDefault: Story = {
  args: {
    ActiveIcon: Chrome,
    DefaultIcon: Desktop,
    as: 'button',
    children: 'Chrome',
    disabled: false,
  },
}
