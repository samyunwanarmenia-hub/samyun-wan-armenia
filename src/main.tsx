import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import 'aos/dist/aos.css'; // Import AOS styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* ToastProvider removed as per new design system, will be re-added if needed with new library */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)