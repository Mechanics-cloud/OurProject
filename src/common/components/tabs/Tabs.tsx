'use client'

import * as React from 'react'

import { typographyVariants } from '@/common/components/typography'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

export type TabsType = {
  content: React.ReactNode
  id: string
  title: string
}

export type TabsData = {
  tabsData: TabsType[]
}

const Tabs = ({ tabsData }: TabsData) => {
  return (
    <TabsPrimitive.Root defaultValue={tabsData[0].id}>
      <TabsPrimitive.List className={clsx('flex w-full bg-dark-700')}>
        {tabsData.map(({ id, title }) => (
          <TabsPrimitive.Trigger
            className={clsx(
              'group',
              'border-dark-100 border-b-2',
              'radix-state-active:border-b-gray-100 radix-state-active:bg-gray-900 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-gray-800',
              'flex-1 px-4 py-1.5',
              // 'focus:radix-state-active:border-active-500',
              'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-accent-300'
            )}
            key={`tab-trigger-${id}`}
            value={id}
          >
            <span
              className={clsx(
                typographyVariants({ variant: 'h3' }),
                'text-dark-100'
              )}
            >
              {title}
            </span>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {tabsData.map(({ content, id }) => (
        <TabsPrimitive.Content
          className={clsx('bg-dark-700 px-6 py-4')}
          key={`tab-content-${id}`}
          value={id}
        >
          <span>{content}</span>
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}

export { Tabs }
