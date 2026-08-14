import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // ProductCard uses <Link> internally, same reason as Nav
import ProductCard from '../components/ProductCard'

describe('ProductCard', () => {
  it('renders the product name, description, origin, and price', () => {
    // A fake product object — tests don't need real fetched data, just a realistic shape
    const mockProduct = {
      id: 1,
      name: 'Test Coffee',
      description: 'A rich, testable roast',
      origin: 'Testland',
      price: 12.99
    }

    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    )

    // Confirm each piece of data actually appears on screen
    expect(screen.getByText('Test Coffee')).toBeInTheDocument()
    expect(screen.getByText('A rich, testable roast')).toBeInTheDocument()
    expect(screen.getByText('Testland')).toBeInTheDocument()
    // Price is rendered as "$12.99" in your component (the $ is hardcoded in JSX, price comes from the prop)
    expect(screen.getByText('$12.99')).toBeInTheDocument()
  })
})