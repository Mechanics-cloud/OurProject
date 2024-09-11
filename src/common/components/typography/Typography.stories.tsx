import { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@/common/components/typography/Typography'

const meta = {
  component: Typography
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const AllTypography: Story = {
  render: () => (
    <div className={'flex flex-col gap-2.5'}>
      <Typography variant="large" asChild><p>Large Heading</p></Typography>
      <Typography variant="h1" asChild><h1>H1: Heading </h1></Typography>
      <Typography variant="h2" asChild><h2>H2: Heading </h2></Typography>
      <Typography variant="h3" asChild><h3>H3: Heading </h3></Typography>
      <Typography variant="reg16" asChild><p>Regular text 16</p></Typography>
      <Typography variant="bold16" asChild><p>Bold text 16</p></Typography>
      <Typography variant="reg14" asChild><p>Regular text 14</p></Typography>
      <Typography variant="med14" asChild><p>Medium text 14</p></Typography>
      <Typography variant="bold14" asChild><p>Bold text 14</p></Typography>
      <Typography variant="small" asChild><p>Regular small text</p></Typography>
      <Typography variant="semiBoldSmall" asChild><p>Semi bold small text</p></Typography>
      <Typography variant="regularLink" asChild><a href="#">Regular link</a></Typography>
      <Typography variant="smallLink" asChild><a href="#">Small link</a></Typography>
    </div>
  ),
};