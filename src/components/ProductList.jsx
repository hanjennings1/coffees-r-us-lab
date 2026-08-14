import ProductCard from './ProductCard'
import useFetch from '../hooks/useFetch' // custom hook replaces manual useState + useEffect + fetch

function ProductList({ searchTerm, selectedLocations }) {
  // useFetch returns the array of products directly, or null while still loading
  const products = useFetch('http://localhost:3001/coffee')

  // Guard clause: while data is still loading, products is null.
  // .filter() would crash on null, so we show a loading state instead.
  if (!products) {
    return <p>Loading products...</p>
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(product.origin)
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