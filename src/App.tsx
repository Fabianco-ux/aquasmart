import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Biblioteca from './pages/Biblioteca'
import Insumos from './pages/Insumos'
import Plagas from './pages/Plagas'
import Soporte from './pages/Soporte'
import Produccion from './pages/Produccion'
import Alimentacion from './pages/Alimentacion'
import Cosecha from './pages/Cosecha'
import Gestion from './pages/Gestion'

function App() {
  return (
    <div style={{ fontFamily: 'Roboto, sans-serif', minHeight: '100vh', background: '#f0f7f4' }}>
      <header style={{
        background: '#1976d2',
        color: 'white',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <h1>AquaSmart Manager - Demo</h1>
        <p>Gestión inteligente de acuicultura</p>
        <nav>
          <Link to="/" style={{ color: 'white', margin: '0 1rem' }}>Dashboard</Link>
          <Link to="/biblioteca" style={{ color: 'white', margin: '0 1rem' }}>Biblioteca</Link>
          <Link to="/insumos" style={{ color: 'white', margin: '0 1rem' }}>Insumos</Link>
          <Link to="/plagas" style={{ color: 'white', margin: '0 1rem' }}>Plagas</Link>
          <Link to="/soporte" style={{ color: 'white', margin: '0 1rem' }}>Soporte</Link>
        </nav>
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
          <Route path="*" element={<div><h2>404 - Página no encontrada (en demo)</h2></div>} />
        </Routes>
      </main>

      <footer style={{ textAlign: 'center', padding: '1rem', background: '#1976d2', color: 'white' }}>
        © 2026 AquaSmart - Demo para clientes
      </footer>
    </div>
  )
}

export default App
