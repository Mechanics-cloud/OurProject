import * as React from 'react'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/filledIcons'
import { Typography } from '@/common/components/typography'
import Link from 'next/link'

import OutlineBell from '../../../assets/icons/outlineIcons/OutlineBell'
import { Button } from '../button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select/Select'

type HeaderProps = {
  isAuth?: boolean
}

const Header = ({ isAuth }: HeaderProps) => {
  return (
    <header
      className={
        'fixed top-0 left-0 w-full h-[var(--header-height)] bg-dark-700 text-light-100 flex items-center justify-between pr-16 border-b border-b-dark-300'
      }
    >
      <Typography
        className={'ml-14 py-3'}
        variant={'large'}
      >
        <Link
          href={'/'}
          title={'Go Home'}
        >
          Inctagram
        </Link>
      </Typography>

      <div className={'flex items-center '}>
        {isAuth && (
          <button
            className={'cursor-pointer mr-12'}
            onClick={() => alert('Картинка нажата!')}
            type={'button'}
          >
            <OutlineBell className={' w-6 h-6'} />
          </button>
        )}
        <Select defaultValue={'en'}>
          <SelectGroup className={'min-w-[10.1875rem] gap-3'}>
            <SelectTrigger className={'[&>span]:gap-3'}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className={'[&>span]:gap-3'}
                value={'en'}
              >
                <FlagUnitedKingdom />
                English
              </SelectItem>
              <SelectItem
                className={'[&>span]:gap-3'}
                value={'ru'}
              >
                <FlagRussia />
                Russian
              </SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
        {!isAuth && (
          <>
            <Button
              className={'mr-6 ml-9'}
              variant={'text'}
            >
              Log in
            </Button>
            <Button>Sing up</Button>
          </>
        )}
      </div>
    </header>
  )
}

export { Header }
