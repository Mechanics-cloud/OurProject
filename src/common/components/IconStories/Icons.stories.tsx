import type { StoryObj } from '@storybook/react'
// import * as filledIcons from '../../../assets/icons/outlineIcons'
import * as filledIcons from '../../../assets/icons/filledIcons'
import * as outlineIcons from '../../../assets/icons/outlineIcons'

const meta = {
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Design/Icons',
}

export default meta
type Story = StoryObj<typeof meta>

export const FilledIcons = () => (
  <div className="flex flex-wrap mx-12">
    {Object.entries(filledIcons).map(([name, Icon]) => (
      <div key={name} className="inline-flex items-center flex-none w-1/4 mr-5 mb-5">
        <Icon className='w-6 h-6 mr-3' /> {name}
      </div>
    ))}
  </div>
);
export const OutlineIcons = () => (
  <div className="flex flex-wrap mx-12">
    {Object.entries(outlineIcons).map(([name, Icon]) => (
      <div key={name} className="inline-flex items-center flex-none w-1/4 mr-5 mb-5">
        <Icon className="w-6 h-6 mr-3"/> {name}
      </div>
    ))}
  </div>
);
