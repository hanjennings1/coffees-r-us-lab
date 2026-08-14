import { Link } from 'react-router-dom' // Link enables client-side navigation without a full page reload
import '../styles/Nav.css'

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/shop">Shop</Link>
      <Link to="/admin">Admin Portal</Link>
    </nav>
  )
}

export default Nav