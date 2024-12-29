import { PropsWithoutRef, Ref, SVGProps, forwardRef, memo } from 'react'

import { Heart, HeartOutline } from '@/assets/icons'
import { cn } from '@/common'

type Props = {
  active?: boolean
  onClick?: () => void
} & PropsWithoutRef<SVGProps<SVGSVGElement>>

const TLike = (
  { active, className, onClick, ...rest }: Props,
  ref: Ref<SVGSVGElement>
) => {
  return active ? (
    <Heart
      className={cn('fill-danger-500', className)}
      onClick={onClick}
      ref={ref}
      {...rest}
    />
  ) : (
    <HeartOutline
      onClick={onClick}
      ref={ref}
      {...rest}
    />
  )
}

const ForwardRef = forwardRef(TLike)

export const Like = memo(ForwardRef)
