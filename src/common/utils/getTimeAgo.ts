import { en } from '@locales/en'
import { ru } from '@locales/ru'

type TimeRangeKey =
  | 'days'
  | 'hours'
  | 'minutes'
  | 'months'
  | 'seconds'
  | 'weeks'
  | 'years'

type TimeRangesObj = {
  [key in TimeRangeKey]: number
}

export function timeAgo(
  input: Date | null | string,
  locale: string | undefined
) {
  if (!input) {
    return ''
  }
  const date = input instanceof Date ? input : new Date(input)
  const formatter = new Intl.RelativeTimeFormat(locale)
  const ranges: TimeRangesObj = {
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    months: 3600 * 24 * 30,
    seconds: 1,
    weeks: 3600 * 24 * 7,
    years: 3600 * 24 * 365,
  }
  const secondsElapsed = (date.getTime() - Date.now()) / 1000

  if (Math.abs(secondsElapsed) < 60) {
    return locale === 'en' ? en.post.createTime : ru.post.createTime
  }
  for (const key in ranges) {
    if (ranges[key as TimeRangeKey] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key as TimeRangeKey]

      return formatter.format(Math.round(delta), key as TimeRangeKey)
    }
  }
}
