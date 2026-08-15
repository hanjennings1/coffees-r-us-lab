import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sidebar from '../components/Sidebar'

describe('Sidebar', () => {
  it('calls onSearchChange when the user types in the search box', async () => {
    const mockOnSearchChange = vi.fn()
    const mockOnLocationToggle = vi.fn()

    render(
      <Sidebar
        searchTerm=""
        selectedLocations={[]}
        onSearchChange={mockOnSearchChange}
        onLocationToggle={mockOnLocationToggle}
      />
    )

    const user = userEvent.setup()

    // getByPlaceholderText targets the search input specifically, since it has a unique placeholder
    await user.type(screen.getByPlaceholderText('Search'), 'vanilla')

    // Sidebar calls onSearchChange on every keystroke, so it should have been called multiple times —
    // here we just confirm it was called at all, since exact call count/timing isn't the point of this test
    expect(mockOnSearchChange).toHaveBeenCalled()
  })

  it('calls onLocationToggle with the correct location when a checkbox is clicked', async () => {
    const mockOnSearchChange = vi.fn()
    const mockOnLocationToggle = vi.fn()

    render(
      <Sidebar
        searchTerm=""
        selectedLocations={[]}
        onSearchChange={mockOnSearchChange}
        onLocationToggle={mockOnLocationToggle}
      />
    )

    const user = userEvent.setup()

    // getByLabelText works here the same way it did for ProductForm — 
    // Sidebar's <label> wraps each checkbox <input> directly
    await user.click(screen.getByLabelText('Brazil'))

    // Confirm the function was called with exactly "Brazil", not just called generically
    expect(mockOnLocationToggle).toHaveBeenCalledWith('Brazil')
  })
})