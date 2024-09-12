import { Typography } from '@/common/components/typography/Typography'
import { typographyData } from '@/common/components/typography/typographyData'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Typography',
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const TypographyText: Story = {
  render: () => (
    <div className={'flex flex-col gap-2.5'}>
      {typographyData.map((item) => {
        return item === 'regularLink' || item === 'smallLink' ? (
          <Typography
            href={'#'}
            key={item}
            variant={item}
          >
            Link text
          </Typography>
        ) : (
          <Typography
            key={item}
            variant={item}
          >
            Typography text
          </Typography>
        )
      })}
    </div>
  ),
}
