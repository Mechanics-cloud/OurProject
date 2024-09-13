import { Card } from '@/common/components/card'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'

describe('Card', () => {
  it('renders a card', () => {
    render(<Card />)

    const card = screen.getByTestId('card-element')

    expect(card).toBeInTheDocument()
  })
})
