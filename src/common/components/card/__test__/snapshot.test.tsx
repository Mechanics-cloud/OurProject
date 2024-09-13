import { Card } from '@/common/components/card'
import { render } from '@testing-library/react'

it('renders card unchanged', () => {
  const { container } = render(<Card />)

  expect(container).toMatchSnapshot()
})
