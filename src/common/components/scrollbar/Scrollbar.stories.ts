import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '@/common/components/scrollbar/Scrollbar'

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

export const BasicScrollbar: Story = {
  args: {
    className: "h-[200px] w-[350px] rounded-md border p-4",
    children: 'Jokester began sneaking into the castle in the middle of the night and leaving\n' +
      '  jokes all over the place: under the king\'s pillow, in his soup, even in the\n' +
      '  royal toilet. The king was furious, but he couldn\'t seem to stop Jokester. And\n' +
      '  then, one day, the people of the kingdom discovered that the jokes left by\n' +
      '  Jokester were so funny that they couldn\'t help but laugh. And once they\n' +
      '  started laughing, they couldn\'t stop.'
  },
};
