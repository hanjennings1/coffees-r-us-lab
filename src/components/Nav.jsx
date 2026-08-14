import { NavLink } from 'react-router-dom' // Link enables client-side navigation without a full page reload
import '../styles/Nav.css'

function Nav() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/admin">Admin Portal</NavLink>
    </nav>
  )
}

export default Nav