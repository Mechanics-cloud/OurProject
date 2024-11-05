import { Ref, SVGProps, forwardRef, memo } from 'react'
const Desktop = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 36 36'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M31.5 3H4.5C2.85 3 1.5 4.35 1.5 6V24C1.5 25.65 2.85 27 4.5 27H15L12 31.5V33H24V31.5L21 27H31.5C33.15 27 34.5 25.65 34.5 24V6C34.5 4.35 33.15 3 31.5 3ZM31.5 21H4.5V6H31.5V21Z'
      }
      fill={'currentColor'}
    />
  </svg>
)
const ForwardRef = forwardRef(Desktop)
const Memo = memo(ForwardRef)

export default Memo
