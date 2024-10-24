import { ChangeEvent, useState } from 'react'
import { DateRange } from 'react-day-picker'

import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography,
} from '@/common'
import { cn } from '@/common/utils/cn'
import { format, isValid, parse } from 'date-fns'
import { ru } from 'date-fns/locale'

import CalendarClosed from '../../../assets/icons/filledIcons/CalendarFilled'
import CalendarOpen from './../../../assets/icons/outlineIcons/CalendarOutline'

type Props = {
  disabled: boolean
  errorMessage?: string
  label: string
  mode: 'range' | 'single'
}

export function DatePickerWithRange({
  disabled,
  errorMessage,
  label,
  mode,
}: Props) {
  const [date, setDate] = useState<DateRange | undefined>()

  const [month, setMonth] = useState(new Date())

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const [inputValue, setInputValue] = useState('')

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('')
      setSelectedDate(undefined)
    } else {
      setSelectedDate(date)

      setMonth(date)
      setInputValue(format(date, 'dd/MM/yyyy'))
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValue(e.target.value)

    const parsedDate = parse(e.target.value, 'dd/MM/yyyy', new Date())

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate)
      setMonth(parsedDate)
    } else {
      setSelectedDate(undefined)
    }
  }

  return (
    <div>
      <label
        className={cn('text-sm text-light-900 ', disabled && 'text-dark-100')}
      >
        {label}
      </label>

      <Popover>
        <PopoverTrigger
          asChild
          disabled={disabled}
        >
          <button
            className={cn(
              'text-light-100 px-3 py-1.5 relative group w-full cursor-pointer  focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-accent-700  focus-visible:outline-none text-left border border-dark-100 rounded-sm bg-dark-500',
              errorMessage &&
                'data-[state=closed]:border-danger-500 data-[state=closed]:text-danger-500 data-[state=closed]:focus-visible:border-transparent',
              disabled &&
                'text-light-900 border-dark-300 cursor-default pointer-events-none'
            )}
            disabled={disabled}
            type={'button'}
          >
            {mode === 'single' ? (
              <input
                className={cn(
                  'w-full bg-transparent outline-none cursor-pointer',
                  disabled && 'cursor-default'
                )}
                disabled={disabled}
                onChange={handleInputChange}
                placeholder={'dd/mm/yyyy'}
                type={'text'}
                value={inputValue}
              />
            ) : (
              <>
                {(date?.from &&
                  ((date.to && (
                    <>
                      {format(date.from, 'MM/dd/yyyy')}
                      {' - '}
                      {format(date.to, 'MM/dd/yyyy')}
                    </>
                  )) ||
                    format(date.from, 'MM/dd/yyyy'))) || (
                  <span>Pick a date</span>
                )}
              </>
            )}
            <CalendarOpen
              className={cn(
                'absolute top-1/2 transform -translate-y-2/4 right-3 group-data-[state=open]:hidden text-light-100 w-6 h-6',
                errorMessage && 'text-danger-500'
              )}
            />
            <CalendarClosed
              className={
                'absolute top-1/2 transform -translate-y-2/4 right-3 group-data-[state=closed]:hidden text-light-100 w-6 h-6'
              }
            />
          </button>
        </PopoverTrigger>
        {!!errorMessage && (
          <Typography
            className={'text-danger-500 '}
            variant={'small'}
          >
            {errorMessage}
          </Typography>
        )}
        <PopoverContent
          align={'start'}
          className={'w-auto p-0'}
        >
          {mode === 'single' ? (
            <Calendar
              className={cn(disabled && 'hidden')}
              disabled={disabled}
              locale={ru}
              mode={'single'}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDayPickerSelect}
              selected={selectedDate}
            />
          ) : (
            <Calendar
              className={cn(disabled && 'hidden')}
              defaultMonth={date?.from}
              disabled={disabled}
              mode={'range'}
              onSelect={setDate}
              selected={date}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
