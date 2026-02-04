import { Grid, Typography, Container } from '@mui/material'
import DashboardCard from '../components/DashboardCard'
import { speciesData } from '../data/species'

const Especies = () => {
  const imageFor = (id: string) => {
    const files: Record<string, string> = {
      bagreCapitan: 'bagre capitan.png',
      bagrePintado: 'bagre pintado.jpg',
      bagreRayado: 'bagre rayado.png',
      bocachico: 'bocachico.png',
      cachama: 'cachama.png',
      camaron: 'camaron.png',
      tilapiaPlateada: 'tilapia plateada.png',
      tilapiaRoja: 'tilapia roja.png',
      trucha: 'trucha.jpg'
    }
    const file = files[id]
    if (!file) return undefined
    const base = new URL(import.meta.env.BASE_URL, window.location.origin)
    return new URL(encodeURI(file), base).toString()
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
        {Object.entries(speciesData).map(([id, data]) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <DashboardCard
              title={data.name}
              description={`Temp: ${data.temperature} · Densidad: ${data.density} · Ciclo: ${data.cycle}`}
              link={`/species/${id}`}
              imageSrc={imageFor(id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Especies
