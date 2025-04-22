import { ComponentPropsWithoutRef } from 'react'

import Loader from '@/assets/images/loader.svg'
import { cn } from '@/common/utils'
import Image from 'next/image'
export const CircleLoader = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={cn('pt-3', className)}
      {...rest}
    >
      <Image
        alt={'Loader'}
        height={50}
        src={Loader}
        width={50}
      />
    </div>
  )
}
