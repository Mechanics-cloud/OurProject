import ReCAPTCHA from 'react-google-recaptcha'

import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: ReCAPTCHA,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/ReCAPTCHA',
} satisfies Meta<typeof ReCAPTCHA>

export default meta

type Story = StoryObj<typeof meta>

export const BaseReCAPTCHA: Story = {
  args: {
    sitekey: '6Ld5J0gqAAAAAIO074PfmvJimeKugXCNtJoX0CHu',
    style: { colorScheme: 'initial' },
    theme: 'dark',
  },
}
