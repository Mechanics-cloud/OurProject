import { Tooltip } from '@/common/components/tooltip/Tooltip'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Tooltip,
  parameters: {
    layout: 'centered',
    position: {
      control: { type: 'select' },
      options: ['bottom', 'left', 'right', 'top'],
    },
  },
  tags: ['autodocs'],
  title: 'Component/Tooltip',
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const BasicTooltip = () => {
  return (
    <Tooltip title={'You did it!'}>
      <p>Hover it</p>
    </Tooltip>
  )
}

export const NotShowTooltip: Story = {
  args: {
    children: <p>Hover it</p>,
    open: true,
    title: "You shouldn't see this",
  },
}
