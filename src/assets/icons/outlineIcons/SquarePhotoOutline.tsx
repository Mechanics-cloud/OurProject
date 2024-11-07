import { Ref, SVGProps, forwardRef, memo } from 'react'

const SquarePhotoOutline = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect
      height={'18'}
      rx={'2'}
      stroke={'currentcolor'}
      strokeWidth={'2'}
      width={'18'}
      x={'1'}
      y={'1'}
    />
  </svg>
)
const ForwardRef = forwardRef(SquarePhotoOutline)
const Memo = memo(ForwardRef)

export default Memo
