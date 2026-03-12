import { ThemeProvider } from './core/components/providers/ThemeProvider'
import { AuthProvider } from './core/components/providers/AuthProvider'
import { AppRoutes } from './routes/Router'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
