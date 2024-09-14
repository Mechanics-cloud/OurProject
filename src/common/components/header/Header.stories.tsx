import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import Image from 'next/image'

import { Header } from './Header'

const meta = {
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const noRegHeader: Story = {}
