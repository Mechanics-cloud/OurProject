import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/filledIcons'
import {
  SelectBasic,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common'
import { useRouter } from 'next/router'

export const LangSelect = () => {
  const { asPath, locale, locales, pathname, push, query } = useRouter()

  const changeLangHandler = (locale: string) => {
    push({ pathname, query }, asPath, { locale })
  }

  return (
    <SelectBasic
      defaultValue={locale}
      onValueChange={changeLangHandler}
    >
      <SelectGroup className={'min-w-[10.1875rem] gap-3'}>
        <SelectTrigger className={'[&>span]:gap-3'}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'en'}>
            <FlagUnitedKingdom />
            English
          </SelectItem>
          <SelectItem value={'ru'}>
            <FlagRussia />
            Russian
          </SelectItem>
        </SelectContent>
      </SelectGroup>
    </SelectBasic>
  )
}
