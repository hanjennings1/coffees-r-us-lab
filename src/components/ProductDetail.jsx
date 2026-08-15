import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductForm from './ProductForm'
import useFetch from '../hooks/useFetch'
import '../styles/ProductDetail.css' // styles for the delete button

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

  // DELETE request: removes this specific product from json-server permanently
  function handleDeleteProduct() {
    // window.confirm shows a simple browser popup asking the user to confirm —
    // prevents accidental deletion from a misclick
    const confirmed = window.confirm('Are you sure you want to delete this product?')

    if (!confirmed) {
      return // user clicked "Cancel" — stop here, do nothing
    }

    fetch(`http://localhost:3001/coffee/${id}`, {
      method: 'DELETE' // no headers/body needed — DELETE just needs the URL to know what to remove
    })
      .then(() => {
        console.log('Product deleted')
        navigate('/shop') // immediately redirect after deleting, no need to show a form anymore
      })
  }

  // Guard clause: while the fetch is still in progress, product is still null.
  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div className="product-detail-page">
      <h1>Edit Product</h1>
      {successMessage && <p>Product updated successfully!</p>}
      <ProductForm initialData={product} onSubmit={handleUpdateProduct} />

      <button onClick={handleDeleteProduct} className="delete-button">
        Delete Product
      </button>
    </div>
  )
}

export default ProductDetail