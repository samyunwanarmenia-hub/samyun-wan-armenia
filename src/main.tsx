import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import 'aos/dist/aos.css'; // Import AOS styles
import ToastProvider from './components/ToastProvider'; // Re-added ToastProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastProvider /> {/* Re-added ToastProvider */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)