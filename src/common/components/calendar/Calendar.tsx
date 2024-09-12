import { DayPicker, DayPickerProps } from 'react-day-picker'

import { ru } from 'date-fns/locale'
type Props = {} & DayPickerProps

export const Calendar = ({ ...restProps }: Props) => {
  const interactiveStyles =
    'focus-visible:border-2 focus-visible:border-accent-300 focus-visible:outline-none hover:bg-accent-700 hover:transition-colors hover:duration-200'
  const buttonBaseStyles = `w-9 h-9 bg-light-900 rounded-full flex items-center justify-center ${interactiveStyles}`

  return (
    <DayPicker
      {...restProps}
      classNames={{
        button_next: buttonBaseStyles,
        button_previous: buttonBaseStyles,

        caption_label: 'text-lg  font-bold',
        chevron: 'w-4 h-4 fill-light-100 ',
        day: 'text-center w-9 h-9 [&:nth-last-child(-n+2)]:text-danger-300 rounded-full ', //td
        day_button: ` w-full h-full rounded-full  ${interactiveStyles} `,

        disabled: '1',
        dropdown: 'block w-2 h-2',
        dropdown_root: 'relative',

        dropdowns: '3',

        focused: '',
        footer: '',

        hidden: '6',
        month: '',
        month_caption: 'mb-3 h-9 flex items-center ',
        month_grid: 'border-collapse', //table

        months: 'relative',

        months_dropdown: '',

        nav: ' absolute right-0 flex ',
        outside: '!text-light-900',
        range_end: 'bg-accent-900  rounded-r-full rounded-none',

        range_middle: 'bg-accent-900 rounded-none ',

        range_start: 'bg-accent-900  rounded-l-full rounded-none',

        root: 'bg-dark-500 text-white w-[300px]  px-6 py-4 ',
        selected: 'bg-accent-900  ',

        today: 'text-accent-500 !font-bold',

        week: '', //tr inside tbody
        week_number: '',
        week_number_header: '',

        weekday: 'text-light-900 w-9 h-9 font-medium', //th

        weekdays: '', //tr inside thead
        weeks: 'before:block before:h-3', //tbody
        years_dropdown: '',
      }}
    />
  )
}
