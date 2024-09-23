import type { Meta, StoryObj } from '@storybook/react'

import { Tooltip } from '@/common/components/tooltip/Tooltip'

const meta = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Tooltip',
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const BasicTooltipWithProps: Story = {
  args: {
    children: 'Hover',
    title: 'Add to library',
  },
}
