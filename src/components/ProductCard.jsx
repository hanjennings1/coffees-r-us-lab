import { Link } from 'react-router-dom' // enables client-side navigation to a specific product

function ProductCard({ product }) {
  return (
    // Link wraps the whole card — clicking anywhere on it navigates to /product/:id
    // Template literal (`${}`) inserts this specific product's id into the URL dynamically
    <Link to={`/product/${product.id}`} className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.origin}</p>
      <p>${product.price}</p>
    </Link>
  )
}

export default ProductCard