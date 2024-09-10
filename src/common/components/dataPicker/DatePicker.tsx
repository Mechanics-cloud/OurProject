import { DayPicker, DayPickerProps } from 'react-day-picker'

type Props = {} & DayPickerProps

export const DatePicker = ({ ...restProps }: Props) => {
  const interactiveStyles =
    'focus-visible:border-2 focus-visible:border-accent-300 focus-visible:outline-none hover:bg-accent-700 hover:transition-colors hover:duration-200'
  const buttonBaseStyles = `w-9 h-9 bg-light-900 rounded-full flex items-center justify-center ${interactiveStyles}`

  return (
    <DayPicker
      {...restProps}
      weekStartsOn={1}
      classNames={{
        root: 'bg-dark-500 text-white w-[300px] max-h-[350px] px-6 py-4',
        months: 'relative',

        nav: ' absolute right-0 flex ',
        button_previous: buttonBaseStyles,
        button_next: buttonBaseStyles,
        chevron: 'w-4 h-4 fill-light-100 ',

        month: '',
        month_caption: 'mb-3 h-9 flex items-center',
        caption_label: 'text-lg  ',

        month_grid: 'border-collapse', //table

        weekdays: '', //tr inside thead
        weekday: 'text-light-900 w-9 h-9 ', //th

        weeks: 'before:block before:h-3', //tbody
        week: '', //tr inside tbody
        day: 'text-center w-9 h-9 [&:nth-last-child(-n+2)]:text-danger-300 rounded-full ', //td
        day_button: ` w-full h-full rounded-full  ${interactiveStyles} `,

        today: 'text-accent-500 ',

        disabled: '1',

        dropdown: 'block w-2 h-2',
        dropdown_root: 'relative',
        dropdowns: '3',

        focused: '',

        footer: '',

        hidden: '6',
        outside: '!text-light-900',

        months_dropdown: '',

        range_end: 'bg-accent-900  rounded-r-full rounded-none',
        range_middle: 'bg-accent-900 rounded-none ',
        range_start: 'bg-accent-900  rounded-l-full rounded-none',

        selected: 'bg-accent-900  ',

        week_number: '',
        week_number_header: '',
        years_dropdown: '',
      }}
    />
  )
}
