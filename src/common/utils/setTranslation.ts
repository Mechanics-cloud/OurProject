import { LocaleType } from '@locales/ru'

export const translationForStore = {
  t: {} as LocaleType,
}

export const setTranslation = (t: LocaleType) => {
  translationForStore.t = t
}
