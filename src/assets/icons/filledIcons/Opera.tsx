import { Ref, SVGProps, forwardRef, memo } from 'react'
const Opera = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'1em'}
    ref={ref}
    viewBox={'0 0 126 126'}
    width={'1em'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <rect
      fill={'none'}
      height={'128'}
      width={'128'}
    />
    <path
      d={
        'M64.017,11.307    c19.744,0,23.759,26.663,23.759,50.874c0,22.427-2.234,52.452-23.517,52.452c-21.283,0-24.035-30.319-24.035-52.744    C40.225,37.68,44.272,11.307,64.017,11.307z M64.019,0C29.147,0,2.667,24.253,2.667,63.39c0,33.814,24.529,64.61,61.332,64.61    c36.811,0,61.335-30.796,61.335-64.61C125.333,24.298,98.892,0,64.019,0z'
      }
      fill={'currentColor'}
    />
  </svg>
)
const ForwardRef = forwardRef(Opera)
const Memo = memo(ForwardRef)

export default Memo
