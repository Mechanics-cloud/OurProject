import { ComponentProps } from 'react'

import { Skeleton, cn } from '@/common'

type Props = ComponentProps<'aside'>

const SkeletonGroup = ({ quantity }: { quantity: number }) => {
  return (
    <>
      {Array.from({ length: quantity }).map((_, index) => (
        <li
          className={'flex gap-4'}
          key={index}
        >
          <Skeleton className={'w-6 h-6'} />
          <Skeleton className={'w-[120px] h-6'} />
        </li>
      ))}
    </>
  )
}

export const LoadingSidebar = ({ className }: Props) => {
  return (
    <>
      <aside
        className={cn(
          'hidden lg:flex lg:flex-col lg:min-w-56 lg:h-full',
          className
        )}
      >
        <nav className={'pt-[72px]'}>
          <ul className={`mb-[60px] [&_li]:mb-6`}>
            {/*  5*/}
            <SkeletonGroup quantity={5} />
          </ul>

          <ul className={`mb-[180px] [&_li]:mb-6`}>
            <SkeletonGroup quantity={2} />
            {/*  2*/}
          </ul>

          <ul className={'mb-9'}>
            <SkeletonGroup quantity={1} />
            {/*  1*/}
          </ul>
        </nav>
      </aside>
    </>
  )
}
