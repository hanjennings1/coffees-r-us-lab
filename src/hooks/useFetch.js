import { useState, useEffect } from 'react'

// A reusable hook for GET requests. Takes any URL, returns the fetched data.
// Any component that needs to fetch from json-server can use this instead of
// writing its own useState + useEffect + fetch every time.
function useFetch(url) {
  // Starts as null — nothing has been fetched yet
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(result => setData(result))
  }, [url]) // re-run the fetch if the url ever changes (e.g. navigating to a different product)

  // Whatever component calls this hook receives the current data,
  // which starts as null and updates once the fetch resolves
  return data
}

export default useFetch