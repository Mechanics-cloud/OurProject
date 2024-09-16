import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/filledIcons'
import { CustomSelect } from '@/common/components/select/CustomSelect'
import { SelectItem } from '@/common/components/select/Select'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CustomSelect> = {
  component: CustomSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/CustomSelect',
} satisfies Meta<typeof CustomSelect>

export default meta

type Story = StoryObj<typeof meta>

export const CustomSelectStory: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'select-item1'}>Select-item-1</SelectItem>
        <SelectItem value={'select-item-2'}>Select-item-2</SelectItem>
        <SelectItem value={'select-item-3'}>Select-item-3</SelectItem>
      </>
    ),
    className: 'min-w-[240px]',
    disabled: true,
    label: 'Select-box',
    placeholder: 'Select item',
  },
}

export const CustomSelectStoryWithIcons: Story = {
  args: {
    children: (
      <>
        <SelectItem value={'ru'}>
          <FlagRussia />
          Russian
        </SelectItem>
        <SelectItem value={'en'}>
          <FlagUnitedKingdom />
          English
        </SelectItem>
      </>
    ),
    className: 'min-w-[240px]',
    defaultValue: 'ru',
  },
}
