import ProductForm from './ProductForm'

function Admin() {
  // Called by ProductForm once the user submits — receives the finished formData
  function handleAddProduct(formData) {
    // POST request: sends a new product to json-server's /coffee endpoint
    fetch('http://localhost:3001/coffee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // tells json-server we're sending JSON
      },
      body: JSON.stringify(formData) // convert the JS object into a JSON string to send
    })
      .then(response => response.json()) // unpack json-server's response (the newly created product, with its assigned id)
      .then(newProduct => {
        console.log('Product added:', newProduct) // temporary — confirms it worked; we'll improve this later
      })
  }

  return (
    <div>
      <h1>Admin Portal</h1>
      {/* No initialData passed — ProductForm renders with empty fields */}
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  )
}

export default Admin