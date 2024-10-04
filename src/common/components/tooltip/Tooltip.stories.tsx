import type { Meta } from '@storybook/react'

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

export const BasicTooltip = () => {
  return (
    <Tooltip title={'You did it!'}>
      <p>Hover it</p>
    </Tooltip>
  )
}
