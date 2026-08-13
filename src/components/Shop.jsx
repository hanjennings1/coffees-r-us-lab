import { useState } from 'react'
import ProductList from './ProductList'
import Sidebar from './Sidebar.jsx'

function Shop() {
  // Text currently typed in the search box
  const [searchTerm, setSearchTerm] = useState('')

  // Array of currently checked location filters
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
      // not selected yet -> add it (spread old array + new item into a NEW array)
      setSelectedLocations([...selectedLocations, location])
    }
  }

  return (
  <div>
    <h1>Shop</h1>
    <Sidebar 
      searchTerm={searchTerm} 
      selectedLocations={selectedLocations} 
      onSearchChange={handleSearchChange} 
      onLocationToggle={handleLocationToggle} 
    />
    <ProductList />
  </div>
)
}

export default Shop