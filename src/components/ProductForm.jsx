import { useState } from 'react'

// initialData is optional — when provided (editing), pre-fills the form.
// When absent (adding new), fields start empty.
// onSubmit is a callback passed down from the parent (Admin or ProductDetail),
// called once with the final form values when Submit is clicked.
function ProductForm({ initialData, onSubmit }) {
  // One state object holding all 4 fields — simpler than 4 separate useStates
  // since we update them all the same way (spread + overwrite one key)
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    origin: initialData?.origin || '',
    price: initialData?.price || ''
  })

  // Single handler reused by all 4 inputs — reads which field changed 
  // from the input's `name` attribute, and updates just that key
  function handleChange(event) {
    const { name, value } = event.target
    setFormData({
      ...formData,   // keep all other fields unchanged
      [name]: value  // overwrite just the field that changed
    })
  }

  // Called when the form is submitted — prevents the default page reload,
  // hands the finished data up to whichever parent rendered this form,
  // then resets its own fields back to empty for the next entry
  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(formData)
    setFormData({ name: '', description: '', origin: '', price: '' }) // reset fields after submit
  }

  return (
    <form onSubmit={handleSubmit}>
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