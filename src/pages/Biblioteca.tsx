import { useState } from 'react'
import { Box, Button, Card, CardContent, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import axios from 'axios'

const initCursos = [
  { titulo: 'Curso de Tilapia: ciclo 6-8 meses', url: 'https://www.youtube.com/watch?v=dummy1' },
  { titulo: 'Buenas prácticas de estanques', url: 'https://www.youtube.com/watch?v=dummy2' },
  { titulo: 'Bioseguridad básica', url: 'https://www.youtube.com/watch?v=dummy3' },
]

export default function Biblioteca() {
  const [cursos, setCursos] = useState(initCursos)
  const [loading, setLoading] = useState(false)

  const handleActualizar = async () => {
    setLoading(true)
    try {
      // Simulación de "pull" desde backend
      await new Promise((res) => setTimeout(res, 800))
      // Ejemplo de uso de axios (mock):
      await axios.get('https://example.com/mock-endpoint').catch(() => {})
      setCursos(prev => [{ titulo: 'NUEVO: Manejo de alevinos', url: '#' }, ...prev])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Biblioteca y Cursos</Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Recursos educativos mock. Haz clic en Actualizar para simular sincronización.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant="contained" onClick={handleActualizar} disabled={loading}>
              {loading ? 'Actualizando…' : 'Actualizar'}
            </Button>
          </Box>
          <List>
            {cursos.map((c, i) => (
              <ListItem key={i} component="a" href={c.url} target="_blank" rel="noreferrer">
                <ListItemText primary={c.titulo} secondary={c.url} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  )
}
