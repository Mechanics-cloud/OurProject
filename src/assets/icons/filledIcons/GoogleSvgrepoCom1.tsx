import { Ref, SVGProps, forwardRef, memo } from 'react'
const SvgGoogleSvgrepoCom1 = (
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
    <g clipPath={'url(#oauth-callback-google-svgrepo-com-1_svg__a)'}>
      <path
        d={
          'M5.266 9.765A7.08 7.08 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65z'
        }
        fill={'#EA4335'}
      />
      <path
        d={
          'M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.08 7.08 0 0 1-6.723-4.823l-4.04 3.067A11.97 11.97 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3z'
        }
        fill={'#34A853'}
      />
      <path
        d={
          'M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.108-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558z'
        }
        fill={'#4A90E2'}
      />
      <path
        d={
          'M5.277 14.268A7.1 7.1 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.9 11.9 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335z'
        }
        fill={'#FBBC05'}
      />
    </g>
    <defs>
      <clipPath id={'oauth-callback-google-svgrepo-com-1_svg__a'}>
        <path
          d={'M0 0h24v24H0z'}
          fill={'#fff'}
        />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgGoogleSvgrepoCom1)
const Memo = memo(ForwardRef)

export default Memo
