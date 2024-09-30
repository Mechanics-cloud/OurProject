import * as React from 'react'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/filledIcons'
import { Button, Select, SelectItem } from '@/common'
import { Typography } from '@/common/components/typography'
import { Paths } from '@/common/paths'
import Link from 'next/link'

import OutlineBell from '../../../assets/icons/outlineIcons/OutlineBell'

type HeaderProps = {
  isAuth?: boolean
}

const Header = ({ isAuth }: HeaderProps) => {
  return (
    <header
      className={
        'fixed z-50 top-0 left-0 w-full max-h-[var(--header-height)] bg-dark-700 text-light-100 flex items-center justify-between pr-16 border-b border-b-dark-300'
      }
    >
      <Typography
        className={'ml-14 py-3'}
        variant={'large'}
      >
        <Link
          href={Paths.home}
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
            <OutlineBell className={'size-6'} />
          </button>
        )}
        <Select defaultValue={'ru'}>
          <SelectItem
            className={'[&>span]:gap-3'}
            value={'en'}
          >
            <FlagUnitedKingdom
              aria-label={'Английский язык'}
              className={'size-6'}
            />
            <span>English</span>
          </SelectItem>
          <SelectItem
            className={'[&>span]:gap-3'}
            value={'ru'}
          >
            <FlagRussia
              aria-label={'Русский язык'}
              className={'size-6'}
            />
            <span>Russian</span>
          </SelectItem>
        </Select>
        {!isAuth && (
          <>
            <Button
              className={'mr-6 ml-9'}
              variant={'text'}
            >
              <Link href={Paths.signIn}>Log in</Link>
            </Button>
            <Button asChild>
              <Link href={Paths.signUp}>Sing up</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

export { Header }
