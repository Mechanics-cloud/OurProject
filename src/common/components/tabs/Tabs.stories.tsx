import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs'

const meta = {
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const BasicTabs: Story = {
  args: {
    children: (
      <>
        <TabsList>
          <TabsTrigger value={'account'}>Account</TabsTrigger>
          <TabsTrigger value={'password'}>Password</TabsTrigger>
        </TabsList>
        <TabsContent value={'account'}>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value={'password'}>Change your password here.</TabsContent>
      </>
    ),
    className: 'w-[400px]',
    defaultValue: 'account',
  },
}
