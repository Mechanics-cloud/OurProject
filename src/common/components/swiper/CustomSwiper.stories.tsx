import type { Meta, StoryObj } from '@storybook/react'

import './customStylesForSwiper.css'

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

export const newsfeedPost: Story = {
  args: {
    className: 'w-[491px]  h-[504px]',
    images: [{ url: image1 }, { url: image1 }, { url: image1 }],
  },
}
export const publicPost: Story = {
  args: {
    className:
      'w-[240px]  h-[240px] swiper-nav-top-55 swiper-nav-small swiper-btn-bg-small swiper-pagination-bottom-8 swiper-bullet-small',
    images: [{ url: image1 }, { url: image1 }, { url: image1 }],
  },
}
