import { Ref, SVGProps, forwardRef, memo } from 'react'
const Yandex = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 46 46'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      d={
        'M4.009,23.496	c0-11.312,9.183-20.495,20.496-20.495s20.496,9.183,20.496,20.495s-9.183,20.495-20.496,20.495S4.009,34.808,4.009,23.496z M26,35.507V25.125l8.549-8.559c0.585-0.587,0.585-1.537,0-2.121c-0.587-0.585-1.537-0.585-2.121,0l-7.931,7.939l-7.931-7.939	c-0.585-0.585-1.535-0.585-2.121,0c-0.585,0.585-0.585,1.535,0,2.121L23,25.129v10.377c0,0.828,0.672,1.5,1.5,1.5	C25.327,37.007,26,36.335,26,35.507z'
      }
      fill={'currentColor'}
    />
  </svg>
)
const ForwardRef = forwardRef(Yandex)
const Memo = memo(ForwardRef)

export default Memo
