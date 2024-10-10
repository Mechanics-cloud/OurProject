import { getLayoutWithSidebar } from '@/common'
import Image from 'next/image'

function NotFound() {
  return (
    <div
      className={'h-full ml-[250px] flex flex-col items-center justify-center'}
    >
      <Image
        alt={'404 image'}
        height={500}
        src={'/404.png'}
        width={500}
      />
    </div>
  )
}

NotFound.getLayout = getLayoutWithSidebar
export default NotFound
