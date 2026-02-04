import { Routes, Route, Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import ChatbotWidget from './components/ChatbotWidget'
import { ChatbotProvider } from './context/ChatbotContext'
import { ThemeProvider, useThemeMode } from './context/ThemeContext'
import Dashboard from './pages/Dashboard'
import Biblioteca from './pages/Biblioteca'
import Insumos from './pages/Insumos'
import Plagas from './pages/Plagas'
import Soporte from './pages/Soporte'
import Produccion from './pages/Produccion'
import Alimentacion from './pages/Alimentacion'
import Cosecha from './pages/Cosecha'
import Gestion from './pages/Gestion'
import Especies from './pages/Especies'
import SpeciesPage from './pages/SpeciesPage'

function App() {
  const { darkMode, toggleTheme } = useThemeMode()
  const logoSrc = new URL('logo.png', new URL(import.meta.env.BASE_URL, window.location.origin)).toString()
  return (
    <ChatbotProvider>
    <div style={{ fontFamily: 'Roboto, sans-serif', minHeight: '100vh' }}>
      <header style={{
        background: '#1976d2',
        color: 'inherit',
        padding: '1rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <img src={logoSrc} alt="AquaSmart Logo" style={{ position: 'absolute', top: 8, left: 12, height: 48 }} />
        <h1>AquaSmart Manager</h1>
        <p>Gestión inteligente de acuicultura</p>
        <nav>
          <Link to="/" style={{ color: 'white', margin: '0 1rem' }}>Dashboard</Link>
          <Link to="/biblioteca" style={{ color: 'white', margin: '0 1rem' }}>Biblioteca</Link>
          <Link to="/insumos" style={{ color: 'white', margin: '0 1rem' }}>Insumos</Link>
          <Link to="/plagas" style={{ color: 'white', margin: '0 1rem' }}>Plagas</Link>
          <Link to="/soporte" style={{ color: 'white', margin: '0 1rem' }}>Soporte</Link>
          <Link to="/especies" style={{ color: 'white', margin: '0 1rem' }}>Especies</Link>
        </nav>
        <div style={{ position: 'absolute', top: 8, right: 12 }}>
          <IconButton aria-label="Toggle theme" onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </header>

      <main style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/insumos" element={<Insumos />} />
          <Route path="/plagas" element={<Plagas />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/produccion" element={<Produccion />} />
          <Route path="/alimentacion" element={<Alimentacion />} />
          <Route path="/cosecha" element={<Cosecha />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/especies" element={<Especies />} />
          <Route path="/species/:speciesId" element={<SpeciesPage />} />
          <Route path="*" element={<div><h2>404 - Página no encontrada</h2></div>} />
        </Routes>
      </main>

      <ChatbotWidget />
      <footer style={{ textAlign: 'center', padding: '1rem', background: '#1976d2', color: 'inherit' }}>
        © 2026 AquaSmart
      </footer>
    </div>
    </ChatbotProvider>
  )
}

const AppWithTheme = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
)

export default AppWithTheme
