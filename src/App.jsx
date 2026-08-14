import { Routes, Route } from 'react-router-dom' // Routes/Route let us map URL paths to components
import Nav from './components/Nav'               // Nav is outside <Routes> so it shows on every page
import Home from './components/Home'
import Shop from './components/Shop'
import Admin from './components/Admin'
import ProductDetail from './components/ProductDetail'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Nav lives here, above Routes, so it renders on every page 
          and never unmounts when you navigate */}
      <Nav />

      {/* Routes acts like a switch: it looks at the current URL 
          and renders only the ONE matching Route's component */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        {/* :id is a URL parameter — matches /product/1, /product/2, etc.
            ProductDetail will read the actual value using useParams() */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App