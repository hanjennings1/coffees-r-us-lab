function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{ product.name }</h3>
      <p>{ product.description }</p>
      <p>{  product.origin }</p>
      <p>${ product.price }</p>
    </div>
  )
}

export default ProductCard