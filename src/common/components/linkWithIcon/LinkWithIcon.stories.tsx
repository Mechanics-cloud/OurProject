import { Desktop } from '@/assets/icons/filledIcons'
import Chrome from '@/assets/icons/filledIcons/Chrome'
import { LinkWithIcon } from '@/common'
import { Meta, StoryObj } from '@storybook/react'
import Link from 'next/link'

const meta = {
  args: {
    ActiveIcon: Chrome,
    DefaultIcon: Chrome,
    as: Link,
    children: 'Chrome',
    disabled: false,
    href: '/123',
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
    as: Link,
    children: 'Chrome',
    disabled: false,
    href: '/123',
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
