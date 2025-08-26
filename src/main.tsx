import './index.css'
import { RoutesApp } from './router'
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { Toaster } from './components/ui/toaster'
import { ThemeProvider } from './context/theme-context'
import { AuthProvider } from './context/auth/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Default Kendo theme
import "@progress/kendo-theme-default/dist/all.css";

// yoki Material design style
// import "@progress/kendo-theme-material/dist/all.css";

// yoki Bootstrap style
// import "@progress/kendo-theme-bootstrap/dist/all.css";


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <RoutesApp />
            </BrowserRouter>
          </ThemeProvider>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
)