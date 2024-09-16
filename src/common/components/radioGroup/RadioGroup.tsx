// import * as React from 'react'
//
// import { typographyVariants } from '@/common/components'
// import { cn } from '@/common/utils/cn'
// import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
// import { clsx } from 'clsx'
//
// type Option = {
//   id: string
//   label: string
// }
// type Props = {
//   classNamesForGroup?: string
//   classNamesForItem?: string
//   options: Option[]
// } & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
//
// export const RadioGroup = React.forwardRef<
//   React.ElementRef<typeof RadioGroupPrimitive.Root>,
//   Props
// >(({ classNamesForGroup, classNamesForItem, options, ...props }, ref) => {
//   return (
//     <RadioGroupPrimitive.Root
//       className={cn('flex gap-[44px]', classNamesForGroup)}
//       {...props}
//       ref={ref}
//     >
//       {options.map(({ id, label }) => (
//         <div
//           className={clsx(
//             'flex justify-center items-center gap-2',
//             'disabled:text-dark-900',
//             classNamesForItem
//           )}
//           key={`radio-group-item-${id}`}
//         >
//           <RadioGroupPrimitive.Item
//             className={clsx(
//               'group',
//               'aspect-square h-5 rounded-full border-2 border-light-100 flex items-center justify-center',
//               'relative',
//               'before:absolute before:w-8 before:h-8 before:rounded-full hover:before:bg-gray-700 before:z-[-1]'
//             )}
//             id={id}
//             value={id}
//           >
//             <RadioGroupPrimitive.Indicator
//               className={'w-2.5 h-2.5 rounded-full bg-light-100'}
//             />
//           </RadioGroupPrimitive.Item>
//           <label
//             className={clsx(
//               typographyVariants({ variant: 'reg14' }),
//               'disabled:text-dark-900'
//             )}
//             htmlFor={id}
//           >
//             {label}
//           </label>
//         </div>
//       ))}
//     </RadioGroupPrimitive.Root>
//   )
// })

import * as React from 'react'

import { typographyVariants } from '@/common/components'
import { cn } from '@/common/utils/cn'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

type Option = {
  id: string
  label: string
}
type Props = {
  classNamesForGroup?: string
  classNamesForItem?: string
  disabled?: boolean
  options: Option[]
} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  Props
>(
  (
    { classNamesForGroup, classNamesForItem, disabled, options, ...props },
    ref
  ) => {
    return (
      <RadioGroupPrimitive.Root
        className={cn('flex gap-[44px]', classNamesForGroup)}
        {...props}
        disabled={disabled}
        ref={ref}
      >
        {options.map(({ id, label }) => (
          <div
            className={clsx(
              'flex justify-center items-center gap-2',
              classNamesForItem,
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            key={`radio-group-item-${id}`}
          >
            <RadioGroupPrimitive.Item
              className={clsx(
                'group',
                'aspect-square h-5 rounded-full border-2 border-light-100 flex items-center justify-center',
                'relative',
                !disabled &&
                  'before:absolute before:w-8 before:h-8 before:rounded-full hover:before:bg-gray-700 before:z-[-1]',
                !disabled &&
                  'focus-visible:before:absolute focus-visible:before:w-8 focus-visible:before:h-8 focus-visible:before:rounded-full focus-visible:before:bg-dark-500 focus-visible:before:z-[-1]',
                disabled && 'cursor-not-allowed'
              )}
              disabled={disabled}
              id={id}
              value={id}
            >
              <RadioGroupPrimitive.Indicator
                className={'w-2.5 h-2.5 rounded-full bg-light-100'}
              />
            </RadioGroupPrimitive.Item>
            <label
              className={clsx(
                typographyVariants({ variant: 'reg14' }),
                disabled ? 'text-gray-500' : 'text-light-100'
              )}
              htmlFor={id}
            >
              {label}
            </label>
          </div>
        ))}
      </RadioGroupPrimitive.Root>
    )
  }
)
