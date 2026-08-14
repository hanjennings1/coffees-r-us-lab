import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // useParams reads the :id from the URL
import ProductForm from './ProductForm'

function ProductDetail() {
  // useParams() returns an object matching your route's dynamic segments.
  // Since your route is "/product/:id", this gives you { id: "5" } (as a string!)
  const { id } = useParams()

  const navigate = useNavigate() // for redirecting after a successful edit

  // Holds the one specific product being viewed/edited. Starts null — nothing loaded yet.
  const [product, setProduct] = useState(null)

  // Tracks whether to show the "Product updated!" message
  const [successMessage, setSuccessMessage] = useState(false)

  useEffect(() => {
    // GET request for ONE product — json-server supports fetching by id like this
    fetch(`http://localhost:3001/coffee/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
  }, [id]) // re-run this effect if `id` ever changes (e.g., navigating from one product straight to another)

  // Called by ProductForm once the user submits the edited values
  function handleUpdateProduct(formData) {
    // PATCH request: updates only the fields provided, for this specific product's id
    fetch(`http://localhost:3001/coffee/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(updatedProduct => {
        console.log('Product updated:', updatedProduct)
        setSuccessMessage(true)

        setTimeout(() => {
          navigate('/shop')
        }, 1500)
      })
  }

  // Guard clause: while the fetch is still in progress, product is still null.
  // Without this check, ProductForm would try to read properties off of null and crash.
  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Edit Product</h1>
      {successMessage && <p>Product updated successfully!</p>}
      {/* initialData passed this time — ProductForm pre-fills all 4 fields */}
      <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
    </div>
  )
}

export default ProductDetail