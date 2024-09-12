import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from './Pagination'

const meta = {
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Component/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

const mockData = [
  {
    email: 'kminall0@google.com',
    first_name: 'Kaila',
    id: 1,
    last_name: 'Minall',
  },
  {
    email: 'hcamous1@senate.gov',
    first_name: 'Haley',
    id: 2,
    last_name: 'Camous',
  },
  {
    email: 'fpieroni2@google.cn',
    first_name: 'Frazier',
    id: 3,
    last_name: 'Pieroni',
  },
  {
    email: 'cgarvill3@mlb.com',
    first_name: 'Charmian',
    id: 4,
    last_name: 'Garvill',
  },
  {
    email: 'askelcher4@mit.edu',
    first_name: 'Arleyne',
    id: 5,
    last_name: 'Skelcher',
  },
  {
    email: 'bwayon5@businessweek.com',
    first_name: 'Bellanca',
    id: 6,
    last_name: 'Wayon',
  },
  {
    email: 'kmingotti6@pinterest.com',
    first_name: 'Karly',
    id: 7,
    last_name: 'Mingotti',
  },
  {
    email: 'zklaes7@amazon.co.uk',
    first_name: 'Zacharie',
    id: 8,
    last_name: 'Klaes',
  },
  {
    email: 'yspalding8@wsj.com',
    first_name: 'Yancey',
    id: 9,
    last_name: 'Spalding',
  },
  {
    email: 'sgredden9@woothemes.com',
    first_name: 'Sully',
    id: 10,
    last_name: 'Gredden',
  },
  {
    email: 'wcliffortha@i2i.jp',
    first_name: 'Wye',
    id: 11,
    last_name: 'Clifforth',
  },
  {
    email: 'fguarinb@goodreads.com',
    first_name: 'Francene',
    id: 12,
    last_name: 'Guarin',
  },
  {
    email: 'kkinzettc@mit.edu',
    first_name: 'Kip',
    id: 13,
    last_name: 'Kinzett',
  },
  {
    email: 'slinked@theglobeandmail.com',
    first_name: 'Stacy',
    id: 14,
    last_name: 'Linke',
  },
  {
    email: 'dlorrainee@cdbaby.com',
    first_name: 'Donal',
    id: 15,
    last_name: 'Lorraine',
  },
  {
    email: 'ccolreinf@hhs.gov',
    first_name: 'Cherry',
    id: 16,
    last_name: 'Colrein',
  },
  {
    email: 'dhuitsong@dedecms.com',
    first_name: 'Debera',
    id: 17,
    last_name: 'Huitson',
  },
  {
    email: 'dmattusevichh@nasa.gov',
    first_name: 'Demeter',
    id: 18,
    last_name: 'Mattusevich',
  },
  {
    email: 'emuggeridgei@icio.us',
    first_name: 'Emeline',
    id: 19,
    last_name: 'Muggeridge',
  },
  {
    email: 'jsouthanj@wordpress.com',
    first_name: 'Johan',
    id: 20,
    last_name: 'Southan',
  },
  {
    email: 'tsmeatonk@dailymotion.com',
    first_name: 'Thia',
    id: 21,
    last_name: 'Smeaton',
  },
  {
    email: 'zjosskovitzl@army.mil',
    first_name: 'Zenia',
    id: 22,
    last_name: 'Josskovitz',
  },
  {
    email: 'cconvillem@lulu.com',
    first_name: 'Clerc',
    id: 23,
    last_name: 'Conville',
  },
  {
    email: 'tgertyn@sohu.com',
    first_name: 'Terrijo',
    id: 24,
    last_name: 'Gerty',
  },
  {
    email: 'ifarnisho@weebly.com',
    first_name: 'Ignaz',
    id: 25,
    last_name: 'Farnish',
  },
  {
    email: 'cdekeyserp@a8.net',
    first_name: 'Carr',
    id: 26,
    last_name: 'de Keyser',
  },
  {
    email: 'pbrazq@theatlantic.com',
    first_name: 'Parke',
    id: 27,
    last_name: 'Braz',
  },
  {
    email: 'wprettyjohnsr@squidoo.com',
    first_name: 'Washington',
    id: 28,
    last_name: 'Prettyjohns',
  },
  {
    email: 'eorroms@gov.uk',
    first_name: 'Edik',
    id: 29,
    last_name: 'Orrom',
  },
  {
    email: 'apinort@youku.com',
    first_name: 'Adriena',
    id: 30,
    last_name: 'Pinor',
  },
  {
    email: 'rspikeingsu@wikispaces.com',
    first_name: 'Rici',
    id: 31,
    last_name: 'Spikeings',
  },
  {
    email: 'ffealeyv@xrea.com',
    first_name: 'Flem',
    id: 32,
    last_name: 'Fealey',
  },
  {
    email: 'jmacgibbonw@123-reg.co.uk',
    first_name: 'Jackie',
    id: 33,
    last_name: 'MacGibbon',
  },
  {
    email: 'ebargx@blogtalkradio.com',
    first_name: 'Erie',
    id: 34,
    last_name: 'Barg',
  },
  {
    email: 'amccrossany@jugem.jp',
    first_name: 'Asa',
    id: 35,
    last_name: 'McCrossan',
  },
  {
    email: 'cpetracchiz@nydailynews.com',
    first_name: 'Charmine',
    id: 36,
    last_name: 'Petracchi',
  },
  {
    email: 'esantori10@ehow.com',
    first_name: 'Ede',
    id: 37,
    last_name: 'Santori',
  },
  {
    email: 'dellery11@dagondesign.com',
    first_name: 'Doreen',
    id: 38,
    last_name: 'Ellery',
  },
  {
    email: 'hthormann12@dailymotion.com',
    first_name: 'Hestia',
    id: 39,
    last_name: 'Thormann',
  },
  {
    email: 'jdevo13@sun.com',
    first_name: 'Jeanette',
    id: 40,
    last_name: 'Devo',
  },
]

export const BasicPagination: Story = {
  args: {
    children: 'Basic Pagination',
  },
}

const BasicPagination1 = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
}
