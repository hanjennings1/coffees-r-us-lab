import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event' // simulates real user typing/clicking

import ProductForm from '../components/ProductForm'

describe('ProductForm', () => {
  it('lets a user fill out and submit the form', async () => {
    // vi.fn() creates a "mock function" — a fake function that just records how it was called,
    // so we can check later whether onSubmit was actually triggered, and with what data
    const mockOnSubmit = vi.fn()

    render(<ProductForm onSubmit={mockOnSubmit} />)

    // user-event's functions are async — must be awaited, since they simulate real timing
    const user = userEvent.setup()

    // getByLabelText finds each input by its associated <label> text — 
    // works because your labels wrap their inputs directly in ProductForm.jsx
    await user.type(screen.getByLabelText('Coffee Name'), 'Mock Coffee')
    await user.type(screen.getByLabelText('Description'), 'A mock roast for testing')
    await user.type(screen.getByLabelText('Origin'), 'Mockland')
    await user.type(screen.getByLabelText('Price'), '9.99')

    // Click the Submit button
    await user.click(screen.getByText('Submit'))

    // Confirm onSubmit was actually called, and with the correct data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Mock Coffee',
      description: 'A mock roast for testing',
      origin: 'Mockland',
      price: 9.99 // now converted to a real number by ProductForm's handleSubmit
  })
})
})