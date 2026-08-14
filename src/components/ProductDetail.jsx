import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductForm from './ProductForm'
import useFetch from '../hooks/useFetch' // custom hook replaces manual useState + useEffect + fetch

function ProductDetail() {
  // useParams() returns { id: "5" } based on the current URL, matching /product/:id
  const { id } = useParams()

  const navigate = useNavigate()

  // useFetch handles the GET request for this one specific product.
  // Returns null while loading, then the product object once fetched.
  const product = useFetch(`http://localhost:3001/coffee/${id}`)

  // Tracks whether to show the "Product updated!" message
  const [successMessage, setSuccessMessage] = useState(false)

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
      <ProductForm initialData={product} onSubmit={handleUpdateProduct} />
    </div>
  )
}

export default ProductDetail