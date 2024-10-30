import { BaseReCAPTCHA } from '@/common'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: BaseReCAPTCHA,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/ReCAPTCHA',
} satisfies Meta<typeof BaseReCAPTCHA>

export default meta

type Story = StoryObj<typeof meta>

export const DarkVariantReCAPTCHA: Story = {}

export const LightVariantReCAPTCHA: Story = {
  args: {
    theme: 'light',
  },
}
