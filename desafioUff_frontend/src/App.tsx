import { ThemeProvider } from './core/components/providers/ThemeProvider'
import { AppRoutes } from './routes/Router'
import './App.css'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
