import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/Routes'
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './provider/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
      </AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
    </HelmetProvider>
  </React.StrictMode>,
)
