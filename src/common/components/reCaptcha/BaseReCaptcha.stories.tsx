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

export const DarkVariantReCAPTCHA: Story = {
  args: {
    sitekey: '6LfYrkgqAAAAADyQy2eYU4aJ7pzeoBkeBtxkOa1R',
  },
}

export const LightVariantReCAPTCHA: Story = {
  args: {
    sitekey: '6LfYrkgqAAAAADyQy2eYU4aJ7pzeoBkeBtxkOa1R',
    theme: 'light',
  },
}
