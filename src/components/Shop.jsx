import { useState, useEffect } from 'react'

function Shop() {
  // products starts as an empty array — will be filled once the fetch completes
  const [products, setProducts] = useState([])

  useEffect(() => {
    // fetch() sends a GET request to json-server's /coffee endpoint
    fetch('http://localhost:3001/coffee')
      // response is the raw envelope — .json() unpacks the actual data (also async)
      .then(response => response.json())
      // data is now a real JS array of coffee objects — save it to state
      .then(data => setProducts(data))
  }, []) // empty dependency array = only run this once, when Shop first mounts

  return (
    <div>
      <h1>Shop</h1>
      {/* .map() loops over the products array, rendering one item per product */}
      {products.map(product => (
        // key is required by React to track each item in a list efficiently
        <div key={product.id}>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default Shop