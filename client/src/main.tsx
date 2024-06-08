import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { Toaster } from './components/ui/toaster'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <AppRoutes />
            <Toaster />
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
)