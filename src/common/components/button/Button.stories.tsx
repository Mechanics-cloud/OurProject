import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { typographyVariants } from '../typography'

const meta: Meta<typeof Button> = {
  title: 'Component/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Button',
    onClick: () => alert('hello'),
    title: 'Click to alert hello',
    disabled: false,
    className: typographyVariants({ variant: 'h3' }),
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
