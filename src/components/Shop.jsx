import { useState } from 'react'
import Sidebar from './Sidebar'
import ProductList from './ProductList'
import '../styles/Shop.css' // side-by-side layout for Sidebar + ProductList, plus the page title

function Shop() {
  // Text currently typed in the search box — lifted up here since 
  // both Sidebar (controls it) and ProductList (filters by it) need access
  const [searchTerm, setSearchTerm] = useState('')

  // Array of currently checked location filters — also lifted up for the same reason
  const [selectedLocations, setSelectedLocations] = useState([])

  // Passed to Sidebar — updates searchTerm whenever the user types
  function handleSearchChange(value) {
    setSearchTerm(value)
  }

  // Passed to Sidebar — adds/removes a location from selectedLocations when its checkbox is clicked
  function handleLocationToggle(location) {
    if (selectedLocations.includes(location)) {
      // already selected -> remove it (keep everything that doesn't match)
      setSelectedLocations(selectedLocations.filter(loc => loc !== location))
    } else {
      // not selected yet -> add it (spread old array + new item into a NEW array, never mutate directly)
      setSelectedLocations([...selectedLocations, location])
    }
  }

  return (
    // <>...</> is a React Fragment — groups the heading and shop-page div together
    // without adding an extra wrapping <div> to the actual HTML output
    <>
      <h1 className="shop-title">Shop</h1>

      {/* shop-page: flex container so Sidebar and ProductList sit side-by-side, matching the mockup */}
      <div className="shop-page">
        <Sidebar 
          searchTerm={searchTerm} 
          selectedLocations={selectedLocations} 
          onSearchChange={handleSearchChange} 
          onLocationToggle={handleLocationToggle} 
        />
        {/* ProductList receives the same filter state, so it can decide which products to actually show */}
        <ProductList searchTerm={searchTerm} selectedLocations={selectedLocations} />
      </div>
    </>
  )
}

export default Shop