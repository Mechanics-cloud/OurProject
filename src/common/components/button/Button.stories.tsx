import { Meta, StoryObj } from '@storybook/react'

import { typographyVariants } from '../typography'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Button',
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    className: typographyVariants({ variant: 'h3' }),
    disabled: false,
    onClick: () => alert('hello'),
    title: 'Click to alert hello',
  },
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    ...Primary.args,
    variant: 'outline',
  },
}

export const TextButton: Story = {
  args: {
    ...Primary.args,
    variant: 'text',
  },
}

export const LinkAsButton: Story = {
  args: {
    asChild: true,
    children: <a href={'/'}>Link</a>,
    className: typographyVariants({ variant: 'h3' }),
  },
}
