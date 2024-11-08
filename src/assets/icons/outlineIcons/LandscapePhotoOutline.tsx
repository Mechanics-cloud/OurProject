import { Ref, SVGProps, forwardRef, memo } from 'react'

const LandscapePhotoOutline = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 26 24'}
    width={'2em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect
      height={'24'}
      rx={'2'}
      stroke={'currentcolor'}
      strokeWidth={'2'}
      transform={'rotate(90 25 3)'}
      width={'18'}
      x={'25'}
      y={'3'}
    />
  </svg>
)
const ForwardRef = forwardRef(LandscapePhotoOutline)
const Memo = memo(ForwardRef)

export default Memo
