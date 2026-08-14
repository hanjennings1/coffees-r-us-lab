import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

describe('App routing', () => {
  it('navigates to the Shop page when the Shop link is clicked', async () => {
    // Replace the real fetch with a fake one that instantly resolves 
    // with an empty array — ProductList just needs *something* valid to receive,
    // we're not testing the data itself here, just that the Shop page loads
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    ))

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const user = userEvent.setup()

    // Confirm we start on the Home page
    expect(screen.getByText('Home Page')).toBeInTheDocument()

    // Click the "Shop" link — getByRole targets the <a> element specifically, 
    // avoiding the ambiguous match with Shop.jsx's <h1>Shop</h1>
    await user.click(screen.getByRole('link', { name: 'Shop' }))

    // Now confirm the heading inside Shop.jsx appears — getByRole with 'heading' 
    // specifically targets the <h1>, not the Nav link, resolving the ambiguity
    expect(screen.getByRole('heading', { name: 'Shop' })).toBeInTheDocument()
  })
})