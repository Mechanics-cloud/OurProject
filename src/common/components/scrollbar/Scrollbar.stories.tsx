import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@/common/components/scrollbar/ScrollArea'
import { Scrollbar } from '@radix-ui/react-scroll-area'
import { ScrollBar } from '@/common/components/scrollbar/Scrollbar'

const meta = {
  title: 'Component/Scrollbar',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicVerticalScrollbar: Story = {
  args: {
    className: "h-[200px] w-[350px] rounded-md border p-3",
    children: 'Jokester began sneaking into the castle in the middle of the night and leaving\n' +
      '  jokes all over the place: under the king\'s pillow, in his soup, even in the\n' +
      '  royal toilet. The king was furious, but he couldn\'t seem to stop Jokester. And\n' +
      '  then, one day, the people of the kingdom discovered that the jokes left by\n' +
      '  Jokester were so funny that they couldn\'t help but laugh. And once they\n' +
      '  started laughing, they couldn\'t stop.',
  },
};

export const BasicHorizontalScrollbar: Story = {
  args: {
    className: "h-[200px] w-[350px] rounded-md border p-3",
    children: <div className={'flex gap-2'}>
      {Array.from({length: 3}).fill(0).map((el, index) => (
        <div key={index} className={'w-[150px] h-28 bg-cyan-700'}></div>
      ))}
      <ScrollBar orientation={'horizontal'}/>
    </div>,
  },
};
