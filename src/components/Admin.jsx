import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // lets us redirect programmatically after success
import ProductForm from './ProductForm'
import '../styles/Admin.css'

function Admin() {
  // navigate is a function we can call to change routes in code (not just via <Link> clicks)
  const navigate = useNavigate()

  // Tracks whether to show the "Product added!" message. Starts false — 
  // nothing has been submitted yet when the page first loads.
  const [successMessage, setSuccessMessage] = useState(false)

  // Called by ProductForm once the user submits — receives the finished formData
  function handleAddProduct(formData) {
    // POST request: sends a new product to json-server's /coffee endpoint
    fetch('http://localhost:3001/coffee', {
      method: 'POST', // must be explicit — GET is the default, POST is not
      headers: {
        'Content-Type': 'application/json' // tells json-server we're sending JSON
      },
      body: JSON.stringify(formData) // convert the JS object into a JSON string to send
    })
      .then(response => response.json()) // unpack json-server's response (new product w/ assigned id)
      .then(newProduct => {
        console.log('Product added:', newProduct) // temporary debug log

        setSuccessMessage(true) // show the success message immediately

        setTimeout(() => {
          navigate('/shop') // after 1.5 seconds, redirect the user to Shop
        }, 4000)
      })
  }

  return (
    <div className="admin-page">
      <h1>Add a Product</h1>

      {/* && short-circuit: only renders the <p> when successMessage is true.
          If false, the whole expression evaluates to false, and React renders nothing. */}
      {successMessage && <p>Product added successfully!</p>}

      {/* No initialData passed — ProductForm renders with empty fields */}
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  )
}

export default Admin