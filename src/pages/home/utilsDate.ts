// Тип для ключей объекта ranges
type TimeRangeKey =
  | 'days'
  | 'hours'
  | 'minutes'
  | 'months'
  | 'seconds'
  | 'weeks'
  | 'years'

// Тип для объекта ranges
type TimeRangesObj = {
  [key in TimeRangeKey]: number
}

export function timeAgo(input: Date | string, locale: string | undefined) {
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

  for (const key in ranges) {
    if (ranges[key as TimeRangeKey] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key as TimeRangeKey]

      return formatter.format(Math.round(delta), key as TimeRangeKey)
    }
  }
}
