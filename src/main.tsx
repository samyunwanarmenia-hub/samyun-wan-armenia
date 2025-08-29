import React from 'react' // Re-added React import
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import ToastProvider from './components/ToastProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastProvider />
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)