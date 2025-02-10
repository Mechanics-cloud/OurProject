import type { Meta, StoryObj } from '@storybook/react'

import { Table } from './Table'

const meta = {
  component: Table.Root,
  tags: ['autodocs'],
  title: 'Component/Table',
} satisfies Meta<typeof Table.Root>

export default meta
type Story = StoryObj<typeof meta>

export const BasicTable: Story = {
  args: {
    children: (
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Date of Payment</Table.HeaderCell>
            <Table.HeaderCell>End date of subscription</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Subscription Type</Table.HeaderCell>
            <Table.HeaderCell>Payment Type</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>1</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    ),
  },
}
