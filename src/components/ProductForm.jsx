import { useState } from 'react'
import '../styles/ProductForm.css'

// initialData is optional — when provided (editing), pre-fills the form.
// When absent (adding new), fields start empty.
// onSubmit is a callback passed down from the parent (Admin or ProductDetail),
// called once with the final form values when Submit is clicked.
function ProductForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    origin: initialData?.origin || '',
    price: initialData?.price || ''
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Called when the form is submitted — prevents the default page reload,
  // converts price to a real number (inputs always produce strings),
  // hands the finished data up to whichever parent rendered this form,
  // then resets its own fields back to empty for the next entry
  function handleSubmit(event) {
    event.preventDefault()

    // Spread all 4 fields, then overwrite price with its number-converted version
    const formattedData = {
      ...formData,
      price: Number(formData.price)
    }

    onSubmit(formattedData)
    setFormData({ name: '', description: '', origin: '', price: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <label>
        Coffee Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Type here"
        />
      </label>

      <label>
        Description
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Type here"
        />
      </label>

      <label>
        Origin
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          placeholder="Type here"
        />
      </label>

      <label>
        Price
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Type here"
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  )
}

export default ProductForm