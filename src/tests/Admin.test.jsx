import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom' // Admin uses useNavigate, which requires Router context
import Admin from '../components/Admin'

describe('Admin', () => {
  it('shows a success message after submitting the form', async () => {
    // Mock fetch so no real network call happens — just returns a fake successful response
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 99, name: 'Mock Coffee' })
      })
    ))

    render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>
    )

    const user = userEvent.setup()

    // Fill out all 4 fields, same pattern as ProductForm.test.jsx
    await user.type(screen.getByLabelText('Coffee Name'), 'Mock Coffee')
    await user.type(screen.getByLabelText('Description'), 'A mock roast')
    await user.type(screen.getByLabelText('Origin'), 'Mockland')
    await user.type(screen.getByLabelText('Price'), '9.99')

    await user.click(screen.getByText('Submit'))

    // The success message only appears AFTER the mocked fetch's Promise resolves.
    // findByText (not getByText) automatically waits for it to appear, instead of checking instantly.
    expect(await screen.findByText('Product added successfully!')).toBeInTheDocument()
  })
})