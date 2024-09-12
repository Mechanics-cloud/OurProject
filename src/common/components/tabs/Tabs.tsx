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

// const Tabs = (tabsData: Array<TabsProp>) => {
//   return <TabsPrimitive.Root defaultValue={'tab1'} />
// }
//
// const TabsList = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.List>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
// >(({ className, ...props }, ref) => (
//   <TabsPrimitive.List
//     className={cn(
//       'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
//       className
//     )}
//     ref={ref}
//     {...props}
//   />
// ))
//
// TabsList.displayName = TabsPrimitive.List.displayName
//
// const TabsTrigger = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.Trigger>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
// >(({ className, ...props }, ref) => (
//   <TabsPrimitive.Trigger
//     className={cn(
//       typographyVariants({ variant: 'h3' }),
//       'inline-flex items-center justify-center whitespace-nowrap px-6 py-1.5 transition-all disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus:outline outline-offset-0 outline-2 outline-accent-700 active:border-b-2 active:bg-accent-100',
//       className
//     )}
//     ref={ref}
//     {...props}
//   />
// ))
//
// TabsTrigger.displayName = TabsPrimitive.Trigger.displayName
//
// const TabsContent = React.forwardRef<
//   React.ElementRef<typeof TabsPrimitive.Content>,
//   React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
// >(({ className, ...props }, ref) => (
//   <TabsPrimitive.Content
//     className={cn(
//       'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
//       className
//     )}
//     ref={ref}
//     {...props}
//   />
// ))
//
// TabsContent.displayName = TabsPrimitive.Content.displayName
//
// export { Tabs, TabsContent, TabsList, TabsTrigger }

const Tabs = ({ tabsData }: TabsData) => {
  return (
    <TabsPrimitive.Root defaultValue={tabsData[0].id}>
      <TabsPrimitive.List className={clsx('flex w-full bg-dark-700')}>
        {tabsData.map(({ id, title }) => (
          <TabsPrimitive.Trigger
            className={clsx(
              'group',
              'border-dark-100 border-b-2',
              'radix-state-inactive:bg-gray-50 radix-state-active:border-b-gray-100 radix-state-active:bg-gray-900 focus-visible:radix-state-active:border-b-transparent radix-state-inactive:bg-gray-800',
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
