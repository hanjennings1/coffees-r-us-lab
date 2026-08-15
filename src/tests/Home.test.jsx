import { render, screen } from '@testing-library/react'
import Home from '../components/Home'

describe('Home', () => {
  it('renders the heading and tagline', () => {
    render(<Home />)

    expect(screen.getByText('Coffees-R-Us')).toBeInTheDocument()
    expect(screen.getByText('the go-to store for all your coffee needs')).toBeInTheDocument()
  })
})