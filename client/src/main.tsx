import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/User/UserContext'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './context/ThemeContext'
import { ActivityProvider } from './context/Activity/ActivityContext'
import { MeasureProvider } from './context/Measure/MeasureContext'
import { CompanyProvider } from './context/Company/CompanyContext'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
                    <AuthProvider>
                        <UserProvider>
                            <ActivityProvider>
                                <MeasureProvider>
                                    <CompanyProvider>
                                        <AppRoutes />
                                        <Toaster />
                                    </CompanyProvider>
                                </MeasureProvider>
                            </ActivityProvider>
                        </UserProvider>
                    </AuthProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </Router>
    </React.StrictMode>
)