import * as React from 'react'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/filledIcons'
import {
  BookmarkOutline,
  LogOutOutline,
  MoreHorizontalOutline,
  OutlineBell,
  SettingsOutline,
  TrendingUpOutline,
} from '@/assets/icons/outlineIcons'
import { Typography } from '@/common/components/typography'
import Link from 'next/link'

import { Button } from '../button'
import { Card } from '../card'
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover'
import { Select, SelectItem } from '../select'

type HeaderProps = {
  isAuth?: boolean
}

export const MobileHeader = ({ isAuth }: HeaderProps) => {
  return (
    <header
      className={
        'fixed z-40 top-0 left-0 w-full h-[3.75rem] bg-dark-700 text-light-100 flex items-center justify-between px-4 sm:p-0 sm:pr-16 border-b border-b-dark-300'
      }
    >
      <Typography
        className={'sm:ml-14 py-3'}
        variant={'large'}
      >
        <Link
          aria-label={'переход на домашнюю страницу'}
          href={'/'}
          title={'Go Home'}
        >
          Inctagram
        </Link>
      </Typography>

      <div className={'flex items-center justify-between gap-6 sm:gap-0'}>
        {isAuth && (
          <button
            className={'hidden sm:block cursor-pointer mr-12 '}
            onClick={() => alert('Картинка нажата!')}
            type={'button'}
          >
            <OutlineBell className={'hidden sm:block w-6 h-6 '} />
          </button>
        )}
        <Select
          className={'[&>button]:border-none'}
          defaultValue={'ru'}
        >
          <SelectItem
            className={'sm:[&>span]:gap-3'}
            value={'en'}
          >
            <FlagUnitedKingdom
              aria-label={'английский язык'}
              className={'w-6 h-6'}
            />
            <span className={'hidden sm:inline'}>English</span>
          </SelectItem>
          <SelectItem
            className={'[&>span]:gap-3'}
            value={'ru'}
          >
            <FlagRussia
              aria-label={'русский язык'}
              className={'w-6 h-6'}
            />
            <span className={'hidden sm:inline'}>Russian</span>
          </SelectItem>
        </Select>
        {!isAuth && (
          <>
            <Button
              className={'hidden sm:block mr-6 ml-9'}
              variant={'text'}
            >
              Log in
            </Button>
            <Button className={'hidden sm:block'}>Sing up</Button>
          </>
        )}
        {isAuth && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={'sm:hidden'}
                type={'button'}
              >
                <MoreHorizontalOutline
                  aria-label={'вызов настроек'}
                  className={
                    'w-6 h-6 active:text-accent-500 focus:text-accent-500'
                  }
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className={'z-50'}>
              <Card
                asChild
                className={'w-[160px] h-[200px] mr-4 mt-0.25 px-3'}
              >
                <nav>
                  <ul>
                    <Link
                      className={
                        'flex items-center gap-2 mb-6  hover:text-accent-500'
                      }
                      href={'/'}
                    >
                      <SettingsOutline className={'w-6 h-6'} />
                      <span className={'text-sm'}>Profile Settings</span>
                    </Link>
                    <Link
                      className={
                        'flex items-center gap-2 mb-6  hover:text-accent-500'
                      }
                      href={'/'}
                    >
                      <TrendingUpOutline className={'w-6 h-6'} />
                      <span className={'text-sm'}>Statistics</span>
                    </Link>
                    <Link
                      className={
                        'flex items-center gap-2 mb-6  hover:text-accent-500'
                      }
                      href={'/'}
                    >
                      <BookmarkOutline className={'w-6 h-6'} />
                      <span className={'text-sm'}>Favorites</span>
                    </Link>
                    <Link
                      className={
                        'flex items-center gap-2 mb-6  hover:text-accent-500'
                      }
                      href={'/'}
                    >
                      <LogOutOutline className={'w-6 h-6'} />
                      <span className={'text-sm'}>Log Out</span>
                    </Link>
                  </ul>
                </nav>
              </Card>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </header>
  )
}
