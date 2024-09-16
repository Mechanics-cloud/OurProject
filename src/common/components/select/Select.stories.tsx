import FlagRussia from '@/assets/icons/FlagRussia'
import FlagUnitedKingdom from '@/assets/icons/FlagUnitedKingdom'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/common/components/select/Select'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Select',
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const SelectExample: Story = {
  args: {
    children: (
      <>
        <SelectGroup>
          <SelectLabel>Select-box</SelectLabel>
          <SelectTrigger className={'min-w-[240px]'}>
            <SelectValue placeholder={'Select-box'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'select item 1'}>Select-item-1</SelectItem>
            <SelectItem value={'select item 2'}>Select-item-2</SelectItem>
            <SelectItem value={'select item 3'}>Select-item-3</SelectItem>
          </SelectContent>
        </SelectGroup>
      </>
    ),
    disabled: true,
  },
}

export const SelectWithIcons: Story = {
  args: {
    children: (
      <>
        <SelectTrigger className={'min-w-[240px]'}>
          <SelectValue defaultValue={'ru'}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'ru'}>
            <FlagRussia />
            Russian
          </SelectItem>
          <SelectItem value={'en'}>
            <FlagUnitedKingdom />
            English
          </SelectItem>
        </SelectContent>
      </>
    ),
    defaultValue: 'ru',
    disabled: true,
  },
}
