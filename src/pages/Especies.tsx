import { Grid, Typography, Container } from '@mui/material'
import DashboardCard from '../components/DashboardCard'
import { especies } from '../mocks/especies'

const Especies = () => {
  const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const imageFor = (name: string) => {
    const n = normalize(name)
    const files: Array<{ key: string; file: string }> = [
      { key: 'bagre capitan', file: 'bagre capitan.png' },
      { key: 'bagre pintado', file: 'bagre pintado.jpg' },
      { key: 'bagre rayado', file: 'bagre rayado.png' },
      { key: 'bocachico', file: 'bocachico.png' },
      { key: 'cachama', file: 'cachama.png' },
      { key: 'camaron', file: 'camaron.png' },
      { key: 'tilapia plateada', file: 'tilapia plateada.png' },
      { key: 'tilapia roja', file: 'tilapia roja.png' },
      { key: 'trucha', file: 'trucha.jpg' },
    ]
    for (const { key, file } of files) {
      if (n.includes(normalize(key))) {
        return new URL(encodeURI(file), import.meta.env.BASE_URL).toString()
      }
    }
    return undefined
  }
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
        Especies disponibles
      </Typography>
      <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 4 }}>
        Consulta rápidamente las especies más comunes en cultivo.
      </Typography>

      <Grid container spacing={3}>
        {especies.map((esp) => (
          <Grid item xs={12} sm={6} md={4} key={esp.nombre}>
            <DashboardCard
              title={esp.nombre}
              description={`Temp: ${esp.temp} · Densidad: ${esp.densidad} · Ciclo: ${esp.ciclo}`}
              imageSrc={imageFor(esp.nombre)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Especies
