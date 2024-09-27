import { cn } from '@/common/utils/cn'

export const Loader = () => {
  return (
    <div
      className={cn(
        'w-full h-1 relative bg-light-300 overflow-hidden',
        'after:absolute after:w-36 after:h-1 after:bg-accent-500 after:top-0 after:left-0 after:animate-loader'
      )}
    ></div>
  )
}

// .loader {
//   width: 100%;
//   height: 4.8px;
//   display: inline-block;
//   position: relative;
//   background: rgba(255, 255, 255, 0.15);
//   overflow: hidden;
// }

// .loader::after {
//   content: '';
//   width: 192px;
//   height: 4.8px;
//   background: #FFF;
//   position: absolute;
//   top: 0;
//   left: 0;
//   box-sizing: border-box;
//   animation: animloader 2s linear infinite;
// }

// @keyframes animloader {
//   0% {
//     left: 0;
//     transform: translateX(-100%);
//   }
//   100% {
//     left: 100%;
//     transform: translateX(0%);
//   }
// }
