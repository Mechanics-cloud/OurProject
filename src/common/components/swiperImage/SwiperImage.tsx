export {}
//todo deprecate

// import { ComponentPropsWithoutRef, useState } from 'react'
//
// import { ImageUrl, cn } from '@/common'
// import Image from 'next/image'
// import {
//   EffectFade,
//   HashNavigation,
//   Navigation,
//   Pagination,
// } from 'swiper/modules'
// import { Swiper, SwiperSlide } from 'swiper/react'
//
// import 'swiper/swiper-bundle.css'
//
// type ImagesTypes = {
//   images: Array<{ url: ImageUrl }>
// } & ComponentPropsWithoutRef<'div'>
//
// export const SwiperImage = ({ className, images }: ImagesTypes) => {
//   const [swiperInstance, setSwiperInstance] = useState<any>(null)
//
//   if (images.length === 0) {
//     //todo translate
//     return <p>Нет изображений для отображения</p>
//   }
//
//   return (
//     <>
//       <Swiper
//         className={cn('h-full w-full', className)}
//         effect={'fade'}
//         hashNavigation={{
//           watchState: true,
//         }}
//         keyboard={{
//           enabled: true,
//         }}
//         modules={[Navigation, Pagination, EffectFade, HashNavigation]}
//         navigation
//         noSwiping
//         noSwipingSelector={'button'}
//         onSwiper={setSwiperInstance}
//         pagination={{
//           clickable: true,
//         }}
//         spaceBetween={30}
//         watchSlidesProgress
//       >
//         {images.map((image, index) => (
//           <SwiperSlide
//             className={'w-full'}
//             key={index}
//           >
//             <Image
//               alt={'Image from gallery'}
//               className={'block h-full w-full object-cover'}
//               height={image.height ?? 300}
//               src={image.url}
//               width={image.width ?? 300}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </>
//   )
// }
