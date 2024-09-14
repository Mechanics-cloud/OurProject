import * as React from 'react'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons'
import { Typography } from '@/common/components/typography'

import OutlineBell from '../../../assets/icons/OutlineBell'
import { Button } from '../button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select/Select'

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
      <Typography
        className={'ml-14 py-3'}
        variant={'large'}
      >
        Inctagram
      </Typography>
      <div className={'flex items-center space-x-4'}>
        {isAuth && (
          <OutlineBell
            className={'cursor-pointer w-6 h-6 mr-12'}
            onClick={() => alert('Картинка нажата!')}
          />
        )}
        <Select defaultValue={'en'}>
          <SelectTrigger
            className={
              'bg-gray-700 text-white rounded px-2 py-3 w-[163px] h-9 mr-9'
            }
          >
            <SelectValue placeholder={'Select-box'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'en'}>
              <span className={'flex items-center gap-3'}>
                <FlagUnitedKingdom />
                English
              </span>
            </SelectItem>
            <SelectItem value={'ru'}>
              <span className={'flex items-center gap-3'}>
                <FlagRussia />
                Русский
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        {!isAuth && (
          <div>
            <Button
              className={'mr-6'}
              variant={'text'}
            >
              Log in
            </Button>
            <Button>Sing up</Button>
          </div>
        )}
      </div>
    </header>
  )
}

export { Header }
