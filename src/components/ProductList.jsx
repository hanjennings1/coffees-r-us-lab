import { useState, useEffect } from 'react'
import ProductCard from './ProductCard' // Each product will be rendered by its own card component

function ProductList() {
  // products holds the full array fetched from json-server
  const [products, setProducts] = useState([])

  useEffect(() => {
    // GET request to json-server's /coffee endpoint
    fetch('http://localhost:3001/coffee')
      .then(response => response.json()) // unpack the raw response into usable JS data
      .then(data => setProducts(data))   // save the array into state
  }, []) // run once, when ProductList first mounts

  return (
    <div className="product-list">
      {/* Loop over products, rendering one ProductCard per item */}
      {products.map(product => (
        // key required by React for list tracking; product passed down as a single prop
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList