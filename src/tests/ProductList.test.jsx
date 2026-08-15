import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom' // ProductList renders ProductCard, which uses <Link>
import ProductList from '../components/ProductList'

describe('ProductList', () => {
  it('renders products returned from the fetch', async () => {
    // Mock fetch to return two fake products, instead of hitting a real server
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: 'Mock Coffee One', description: 'desc', origin: 'Brazil', price: 10 },
          { id: 2, name: 'Mock Coffee Two', description: 'desc', origin: 'Colombia', price: 12 }
        ])
      })
    ))

    render(
      <BrowserRouter>
        <ProductList searchTerm="" selectedLocations={[]} />
      </BrowserRouter>
    )

    // findByText waits for the fetch to resolve and the products to actually render
    expect(await screen.findByText('Mock Coffee One')).toBeInTheDocument()
    expect(await screen.findByText('Mock Coffee Two')).toBeInTheDocument()
  })

  it('filters out products that do not match the search term', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, name: 'Mock Coffee One', description: 'desc', origin: 'Brazil', price: 10 },
          { id: 2, name: 'Mock Coffee Two', description: 'desc', origin: 'Colombia', price: 12 }
        ])
      })
    ))

    render(
      <BrowserRouter>
        <ProductList searchTerm="One" selectedLocations={[]} />
      </BrowserRouter>
    )

    // Only the matching product should appear
    expect(await screen.findByText('Mock Coffee One')).toBeInTheDocument()

    // queryByText (not getByText) returns null instead of throwing when NOT found —
    // that's exactly what we want to assert here: this text should NOT exist
    expect(screen.queryByText('Mock Coffee Two')).not.toBeInTheDocument()
  })
})