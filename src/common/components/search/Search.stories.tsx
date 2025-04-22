import { Search } from '@/common'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Search> = {
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Search',
} satisfies Meta<typeof Search>

export default meta

type Story = StoryObj<typeof meta>

export const SearchStory: Story = {
  args: {},
}
