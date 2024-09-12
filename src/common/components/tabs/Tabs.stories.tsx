import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import Image from 'next/image'

import { Tabs, TabsType } from './Tabs'

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

const tabs: TabsType[] = [
  {
    // eslint-disable-next-line react/no-unescaped-entities
    content: (
      <Typography variant={'reg16'}>Don&apos;t click forward</Typography>
    ),
    id: 'tab1',
    title: 'Today',
  },
  {
    content: (
      <div>
        <p>I recommend you to stop</p>
        <Button>Stop here</Button>
      </div>
    ),
    id: 'tab2',
    title: 'Tomorrow',
  },

  {
    content: (
      <>
        So... It&apos;s too late for you
        <Image
          alt={'Picture'}
          height={400}
          src={
            'https://www.georgeezell.com/wp-content/uploads/2020/10/image-8.jpeg'
          }
          width={300}
        />
      </>
    ),
    id: 'tab3',
    title: 'Always',
  },
]

// export const BasicTabs: Story = {
//   args: {
//     children: (
//       <>
//         <TabsList>
//           <TabsTrigger value={'account'}>Account</TabsTrigger>
//           <TabsTrigger value={'password'}>Password</TabsTrigger>
//         </TabsList>
//         <TabsContent value={'account'}>
//           Make changes to your account here.
//         </TabsContent>
//         <TabsContent value={'password'}>Change your password here.</TabsContent>
//       </>
//     ),
//     className: 'w-[400px] bg-dark-700 p-4 rounded-s',
//     defaultValue: 'account',
//   },
// }

export const BasicTabs1: Story = {
  args: {
    tabsData: tabs,
  },
}
