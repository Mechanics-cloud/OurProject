import * as React from 'react'

import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/filledIcons'
import { Select, SelectItem } from '@/common'
import { useRouter } from 'next/router'

export const LangSelect = () => {
  const { asPath, locale, locales, pathname, push, query } = useRouter()

  const changeLangHandler = (locale: string) => {
    push({ pathname, query }, asPath, { locale: locale ?? 'ru' })
  }

  return (
    <Select
      className={'[&>button]:border-none'}
      defaultValue={locale ?? 'ru'}
      onValueChange={changeLangHandler}
    >
      <SelectItem
        className={'[&>span]:gap-3'}
        value={'en'}
      >
        <FlagUnitedKingdom
          aria-label={'английский язык'}
          className={'size-6'}
        />
        <span className={'hidden sm:inline'}>English</span>
      </SelectItem>
      <SelectItem
        className={'[&>span]:gap-3'}
        value={'ru'}
      >
        <FlagRussia
          aria-label={'русский язык'}
          className={'size-6'}
        />
        <span className={'hidden sm:inline'}>Русский</span>
      </SelectItem>
    </Select>
  )
}
