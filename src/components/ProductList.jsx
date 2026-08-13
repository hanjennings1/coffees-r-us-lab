import { useState, useEffect } from 'react'
import ProductCard from './ProductCard' // Each product will be rendered by its own card component

function ProductList( {searchTerm, selectedLocations} ) {
  // products holds the full array fetched from json-server
  const [products, setProducts] = useState([])

  useEffect(() => {
    // GET request to json-server's /coffee endpoint
    fetch('http://localhost:3001/coffee')
      .then(response => response.json()) // unpack the raw response into usable JS data
      .then(data => setProducts(data))   // save the array into state
  }, []) // run once, when ProductList first mounts

    const filteredProducts = products.filter(product => {
    // does the product's name contain the search text (case-insensitive)?
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

    // show if no location filters are checked (array empty), 
    // OR this product's origin is one of the checked locations
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(product.origin)

    // product only displays if BOTH conditions are true
    return matchesSearch && matchesLocation
    })

  return (
    <div className="product-list">
        {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}

export default ProductList