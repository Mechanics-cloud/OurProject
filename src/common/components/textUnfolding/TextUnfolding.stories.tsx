import type { Meta, StoryObj } from '@storybook/react'

import { TextUnfolding, Typography } from '@/common'

const meta = {
  args: {
    charactersToShow: 250,
  },
  component: TextUnfolding,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/TextUnfolding',
} satisfies Meta<typeof TextUnfolding>

export default meta
type Story = StoryObj<typeof meta>

export const LongTextUnfolding: Story = {
  args: {
    children:
      'Эстетическое воздействие редуцирует диалогический парафраз. Модальность высказывания семантически притягивает речевой акт. Декодирование активно. Мифопорождающее текстовое устройство начинает диссонансный палимпсест, однако дальнейшее развитие приемов декодирования мы находим в работах академика В.Виноградова. Модальность высказывания отталкивает метафоричный метр, таким образом постепенно смыкается с сюжетом. Диалогический контекст отражает дольник.\n' +
      '\n' +
      'Холодный цинизм приводит метр. Абстрактное высказывание семантически притягивает словесный амфибрахий. Синхрония представляет собой метафоричный голос персонажа.\n' +
      '\n' +
      'Лексика доступна. Ударение, соприкоснувшись в чем-то со своим главным антагонистом в постструктурной поэтике, пространственно неоднородно. Парафраз прекрасно нивелирует мифопоэтический хронотоп, первым образцом которого принято считать книгу А.Бертрана "Гаспар из тьмы". Филологическое суждение интегрирует диалогический контекст. Например, лес — для опытного лесника, охотника, просто внимательного грибника — неисчерпаемое природное семиотическое пространство — текст, поэтому цезура откровенна. Кроме того, постоянно воспроизводится постулат о письме как о технике, обслуживающей язык, поэтому стих вызывает символ.',
  },
}

export const ShortTextUnfolding: Story = {
  args: {
    children: 'Short text without button',
  },
}

export const LongTextInBox: Story = {
  args: {
    charactersToShow: 243,
    children:
      'Эстетическое воздействие редуцирует диалогический парафраз. Модальность высказывания семантически притягивает речевой акт. Декодирование активно. Мифопорождающее текстовое устройство начинает диссонансный палимпсест, однако дальнейшее развитие приемов декодирования мы находим в работах академика В.Виноградова. Модальность высказывания отталкивает метафоричный метр, таким образом постепенно смыкается с сюжетом. Диалогический контекст отражает дольник. Холодный цинизм приводит метр. Абстрактное высказывание семантически притягивает словесный амфибрахий. Синхрония представляет собой метафоричный голос персонажа. Лексика доступна. Ударение, соприкоснувшись в чем-то со своим главным антагонистом в постструктурной поэтике, пространственно неоднородно. Парафраз прекрасно нивелирует мифопоэтический хронотоп, первым образцом которого принято считать книгу А.Бертрана "Гаспар из тьмы". Филологическое суждение интегрирует диалогический контекст. Например, лес — для опытного лесника, охотника, просто внимательного грибника — неисчерпаемое природное семиотическое пространство — текст, поэтому цезура откровенна. Кроме того, постоянно воспроизводится постулат о письме как о технике, обслуживающей язык, поэтому стих вызывает символ.',
    className: 'w-[300px] border rounded-sm p-6',
  },
}

export const LongTextWithLink: Story = {
  args: {
    charactersToShow: 243,
    children:
      'Эстетическое воздействие редуцирует диалогический парафраз. Модальность высказывания семантически притягивает речевой акт. Декодирование активно. Мифопорождающее текстовое устройство начинает диссонансный палимпсест, однако дальнейшее развитие приемов декодирования мы находим в работах академика В.Виноградова. Модальность высказывания отталкивает метафоричный метр, таким образом постепенно смыкается с сюжетом. Диалогический контекст отражает дольник. Холодный цинизм приводит метр. Абстрактное высказывание семантически притягивает словесный амфибрахий. Синхрония представляет собой метафоричный голос персонажа. Лексика доступна. Ударение, соприкоснувшись в чем-то со своим главным антагонистом в постструктурной поэтике, пространственно неоднородно. Парафраз прекрасно нивелирует мифопоэтический хронотоп, первым образцом которого принято считать книгу А.Бертрана "Гаспар из тьмы". Филологическое суждение интегрирует диалогический контекст. Например, лес — для опытного лесника, охотника, просто внимательного грибника — неисчерпаемое природное семиотическое пространство — текст, поэтому цезура откровенна. Кроме того, постоянно воспроизводится постулат о письме как о технике, обслуживающей язык, поэтому стих вызывает символ.',
    className: 'w-[300px] border rounded-sm p-6',
    link: (
      <Typography
        href={'/'}
        variant={'regularLink'}
      >
        User Name
      </Typography>
    ),
  },
}

export const LongTextEnglish: Story = {
  args: {
    charactersToShow: 250,
    children:
      'Detective Clara Redwood adjusted her red fedora and stepped out of her vintage car, the sun casting a warm glow over the grand estate before her. The Vanishing Heiress, they called it—a mystery that had the town buzzing. Clara had a knack for solving the unsolvable, and this case was no exception."The estate belonged to the wealthy Wentworth family, whose daughter, Evelyn Wentworth, had mysteriously disappeared a week ago. Clara had been hired by Evelyn\'s frantic parents, who were desperate for answers."As Clara approached the grand entrance, the butler, Mr. Thompson, greeted her with a solemn nod. "Detective Redwood, welcome. The family is in the drawing room."Clara followed the butler through the opulent halls, her keen eyes taking in every detail. The drawing room was a study in elegance, with plush furniture and intricate tapestries. Mr. and Mrs. Wentworth sat by the fireplace, their faces etched with worry. "Thank you for coming, Detective," Mr. Wentworth said, his voice strained. "We need to find our daughter."Clara nodded, her mind already piecing together the puzzle. "Tell me everything from the beginning."',
    className: 'w-[300px] border rounded-sm p-6',
  },
}
