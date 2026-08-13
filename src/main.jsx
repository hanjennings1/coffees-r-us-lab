import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter to enable client-side routing
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter wraps the entire app so any component inside 
        can use routing features (Link, useNavigate, useParams, etc.) */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)