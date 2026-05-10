import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--surface2)',
            color: 'var(--ink)',
            border: '1px solid #2A2A2A',
            borderRadius: '0',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#060606' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#060606' },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)
