import { Link } from 'react-router-dom' // enables client-side navigation to a specific product
import '../styles/ProductCard.css'

function ProductCard({ product }) {
  return (
    // Link wraps the whole card — clicking anywhere on it navigates to /product/:id
    // Template literal (`${}`) inserts this specific product's id into the URL dynamically
    <Link to={`/product/${product.id}`} className="product-card">
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p>{product.origin}</p>
      <p className="price">${Number(product.price).toFixed(2)}</p>
    </Link>
  )
}

export default ProductCard