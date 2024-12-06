import { cn } from '@/common'
import Image from 'next/image'

import image1 from '../../../assets/images/image1.jpg'
import image2 from '../../../assets/images/image2.jpg'
import image3 from '../../../assets/images/image3.jpg'
import image4 from '../../../assets/images/image4.jpg'

const placeholderImages = [
  { id: 1, img: image1 },
  { id: 2, img: image2 },
  { id: 3, img: image3 },
  { id: 4, img: image4 },
  { id: 5, img: image1 },
  { id: 6, img: image2 },
  { id: 7, img: image3 },
  { id: 8, img: image4 },
]

export const ProfilePosts = () => {
  return (
    <div
      className={cn(
        'grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full'
      )}
    >
      {placeholderImages.map((image) => (
        <Image
          alt={'image'}
          className={'w-full h-auto object-cover'}
          height={228}
          key={image.id}
          layout={'responsive'}
          src={image.img}
          width={342}
        />
      ))}
    </div>
  )
}
