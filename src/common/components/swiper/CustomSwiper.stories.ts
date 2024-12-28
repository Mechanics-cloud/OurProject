import type { Meta, StoryObj } from '@storybook/react'

import image1 from '../../../assets/images/image1.jpg'
import CustomSwiper from './CustomSwiper'

const meta = {
  component: CustomSwiper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Swiper',
} satisfies Meta<typeof CustomSwiper>

export default meta
type Story = StoryObj<typeof meta>

export const emptyImages: Story = {
  args: {
    className: '',
    images: [],
  },
}

export const manyImages: Story = {
  args: {
    className: 'h-[500px] w-[500px]',
    images: [{ url: image1 }, { url: image1 }, { url: image1 }],
  },
}
