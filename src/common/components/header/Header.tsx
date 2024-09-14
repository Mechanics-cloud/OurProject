import * as React from 'react'

import { typographyVariants } from '@/common/components/typography'
import { clsx } from 'clsx'
import Image from 'next/image'

const Header = () => {
  return (
    <header
      className={
        'fixed top-0 left-0 w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4'
      }
    >
      <p className={'text-lg font-bold'}>Inctagram</p>
      <div className={'flex items-center space-x-4'}>
        <select className={'bg-gray-700 text-white rounded px-2 py-1'}>
          <option value={'ru'}>Русский</option>
          <option value={'en'}>English</option>
        </select>
        <Image
          alt={'Logo'}
          className={'cursor-pointer'}
          height={30}
          onClick={() => alert('Картинка нажата!')} // Пример действия при клике
          src={'/path/to/your/image.png'} // Укажите путь к вашей картинке
          width={30}
        />
      </div>
    </header>
  )
}

export { Header }

{
  /* <div className='w-screen bg-red-300 h-20'>
<div className='h-[60px] w-full bg-slate-400/50'>
  hello
</div>
</div> */
}
