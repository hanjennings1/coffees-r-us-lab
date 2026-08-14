import { render, screen } from '@testing-library/react' // render mounts the component; screen lets us query what's on the page
import { BrowserRouter } from 'react-router-dom' // Link components require a Router context to work, even in tests
import Nav from '../components/Nav'

describe('Nav', () => {
  it('renders all three navigation links', () => {
    // Nav uses <Link>, which needs to be inside a Router — wrap it here just like main.jsx does
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    )

    // screen.getByText searches the rendered output for matching text.
    // If the text isn't found, the test fails with a helpful error.
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Shop')).toBeInTheDocument()
    expect(screen.getByText('Admin Portal')).toBeInTheDocument()
  })
})