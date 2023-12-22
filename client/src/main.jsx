import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/auth.jsx';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
          <App />
     </BrowserRouter>
    </AuthProvider>
    
  </React.StrictMode>,
)
