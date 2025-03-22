/**
 * Форматирует дату из ISO-строки в локализованный короткий формат.
 *
 * Форматирование происходит по следующим правилам:
 * - Если прошло менее 1 минуты, возвращает "Now" (для локали, отличной от "ru-RU") или "Только что" (для "ru-RU").
 * - Если дата за последние 24 часа (и находится в пределах текущей календарной даты), возвращает только время (например, "10:15").
 * - Если дата в пределах текущей недели, возвращает сокращённое название дня недели и время (например, "Вт 10:15").
 * - Если дата старше недели, возвращает число, сокращённое название месяца и время (например, "11 мар 10:15").
 *
 * @param {string} isoString - Дата в формате ISO 8601 (например, "2025-03-11T13:04:38.567Z").
 * @param {string} [locale='ru-RU'] - Локаль для форматирования (по умолчанию "ru-RU").
 * @returns {string} - Отформатированная строка с датой.
 *
 * @example
 * // Если дата старше недели:
 * formatIsoDateToShortDate("2025-03-11T13:04:38.567Z"); // "11 мар 10:15" (для "ru-RU")
 *
 * @example
 * // Если дата в пределах текущей недели:
 * formatIsoDateToShortDate("2025-03-13T13:04:38.567Z"); // "Чт 13:04" (для "ru-RU")
 *
 * @example
 * // Если прошло менее 1 минуты:
 * formatIsoDateToShortDate(new Date().toISOString()); // "Только что" или "Now"
 */

export function formatIsoDateToShortDate(
  isoString: string,
  locale: string = 'ru-RU'
): string {
  const date = new Date(isoString)
  const now = new Date()

  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

  if (diffInMinutes < 1) {
    return locale === 'ru-RU' ? 'Только что' : 'Now'
  }

  if (diffInHours < 24 && date.getDate() === now.getDate()) {
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const dayOfWeek = (now.getDay() + 6) % 7 // преобразуем: понедельник = 0, воскресенье = 6
  const startOfWeek = new Date(now)

  startOfWeek.setHours(0, 0, 0, 0)
  startOfWeek.setDate(now.getDate() - dayOfWeek)

  if (date >= startOfWeek) {
    const weekday = new Intl.DateTimeFormat(locale, {
      weekday: 'short',
    }).format(date)
    const time = new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)

    return `${weekday} ${time}`
  }

  const day = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(date)
  const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date)
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  return `${day} ${month} ${time}`
}
