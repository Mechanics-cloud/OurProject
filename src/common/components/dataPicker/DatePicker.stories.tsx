import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './DatePicker'
import { useState } from 'react'
import { addToRange, DateRange } from 'react-day-picker'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from './../popover/Popover'

const meta = {
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DatePicker',
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: () => {
    const [meetingDate, setMeetingDate] = useState<Date | undefined>(undefined)

    const footer = meetingDate
      ? `Дата встречи назначена на ${meetingDate.toLocaleDateString()}`
      : 'Пожалуйста, выберите дату встречи.'

    return (
      <>
        <DatePicker
          mode='single'
          onSelect={setMeetingDate}
          selected={meetingDate}
          footer={footer}
        />
      </>
    )
  },
}
export const Range: Story = {
  args: {
    mode: 'range',
  },
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>()

    const handleDayClick = (day: Date) => {
      const newRange = addToRange(day, range)
      setRange(newRange)
    }
    return (
      <>
        <DatePicker
          mode='range'
          selected={range}
          onDayClick={handleDayClick}
        />
        {range && (
          <p>
            Вы выбрали с {range?.from?.toLocaleDateString()} по{' '}
            {range?.to?.toLocaleDateString()}.
          </p>
        )}
      </>
    )
  },
}
export const Multiple: Story = {
  args: {
    mode: 'multiple',
  },
  render: () => {
    const [selected, setSelected] = useState<Date[] | undefined>()

    return (
      <>
        <DatePicker
          mode='multiple'
          selected={selected}
          onSelect={setSelected}
        />
        {selected && (
          <p>
            Вы выбрали: {selected.map((el) => el.toLocaleDateString() + ' ')}
          </p>
        )}
      </>
    )
  },
}
export const PopoverDate: Story = {
  render: () => {
    const [meetingDate, setMeetingDate] = useState<Date | undefined>(undefined)

    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <button>
              {meetingDate ? (
                meetingDate.toLocaleDateString()
              ) : (
                <span>Pick a date</span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <DatePicker
              mode='single'
              onSelect={setMeetingDate}
              selected={meetingDate}
            />
          </PopoverContent>
        </Popover>
      </>
    )
  },
}
