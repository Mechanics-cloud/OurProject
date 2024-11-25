'use client'

import * as React from 'react'

import { cn } from '@/common'
import * as SliderPrimitive from '@radix-ui/react-slider'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    defaultValue={[100]}
    max={100}
    ref={ref}
    step={1}
    {...props}
  >
    <SliderPrimitive.Track
      className={
        'relative h-0.5 w-full grow overflow-hidden rounded-full bg-light-100'
      }
    >
      <SliderPrimitive.Range className={'absolute h-full bg-accent-500'} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={
        'block h-3 w-3 rounded-full border-[3px] bg-light-100 border-accent-500 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-2 hover:cursor-pointer focus:cursor-grabbing'
      }
    />
  </SliderPrimitive.Root>
))

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
