import ProductList from './ProductList' // ProductList now owns the fetch/state logic

function Shop() {
  return (
    <div>
      <h1>Shop</h1>
      {/* ProductList handles fetching and rendering all the ProductCards */}
      <ProductList />
    </div>
  )
}

export default Shop