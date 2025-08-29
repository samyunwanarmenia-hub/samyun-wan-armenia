import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import AppWrapper from './App.tsx' // Changed import to AppWrapper
import './index.css'
import ToastProvider from './components/ToastProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ToastProvider />
      <AppWrapper /> {/* Render AppWrapper */}
    </HelmetProvider>
  </React.StrictMode>,
)