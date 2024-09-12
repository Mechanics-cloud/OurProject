'use client'

import * as React from 'react'

import { typographyVariants } from '@/common/components/typography'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

export type TabsType = {
  content: React.ReactNode
  disabled?: true
  id: string
  title: string
}

export type TabsData = {
  tabsData: TabsType[]
} & React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsData
>(({ tabsData }, ref) => {
  return (
    <TabsPrimitive.Root
      defaultValue={tabsData[0].id}
      ref={ref}
    >
      <TabsPrimitive.List className={clsx('flex w-full bg-dark-700')}>
        {tabsData.map(({ disabled, id, title }) => (
          <TabsPrimitive.Trigger
            className={clsx(
              'group',
              'border-dark-100 border-b-2 text-dark-100',
              'flex-1 px-4 py-1.5',
              'radix-state-active:border-b-accent-500 radix-state-active:bg-gray-900 radix-state-active:text-accent-500 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-dark-700',
              'focus:radix-state-active:border-active-500',
              'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-accent-300',
              'hover:radix-state-active:bg-accent-900/[.15] hover:radix-state-inactive:bg-accent-900/[.15]',
              'active:bg-accent-100/[.15]'
            )}
            disabled={disabled ?? false}
            key={`tab-trigger-${id}`}
            value={id}
          >
            <span className={clsx(typographyVariants({ variant: 'h3' }))}>
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
})

export { Tabs }
