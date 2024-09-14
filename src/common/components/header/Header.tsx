import * as React from 'react'

import { Typography } from '@/common/components/typography'
import OutlineBell from '../../../assets/icons/OutlineBell'
import { Button } from '../button'

type HeaderProps = {
  isAuth: boolean
}

const Header = (props: HeaderProps) => {
  const { isAuth } = props
  return (
    <header
      className={
        'fixed top-0 left-0 w-full h-[60px] bg-gray-800 text-white flex items-center justify-between pr-16 border-b border-b-dark-300'
      }
    >
      <Typography variant={'large'} className={'ml-14 py-3'}>Inctagram</Typography>
      <div className={'flex items-center space-x-4'}>
        {isAuth && <OutlineBell
          className="cursor-pointer w-6 h-6 mr-12"
          onClick={() => alert('Картинка нажата!')}
        />}
        <select className={'bg-gray-700 text-white rounded px-2 py-3 w-[163px] h-9 mr-9'}>
          <option value={'en'}>English</option>
          <option value={'ru'}>Русский</option>
        </select>
        {!isAuth && <div><Button variant={'text'} className={'mr-6'}>Log in</Button><Button>Sing up</Button></div>}

      </div>
    </header>
  )
}

export { Header }

