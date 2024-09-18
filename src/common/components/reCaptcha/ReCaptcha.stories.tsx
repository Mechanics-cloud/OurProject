import { BaseReCAPTCHA } from '@/common/components/reCaptcha/BaseReCAPTCHA'
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

export const ReCAPTCHA: Story = {
  args: {
    sitekey: '6Ld5J0gqAAAAAIO074PfmvJimeKugXCNtJoX0CHu',
  },
}
