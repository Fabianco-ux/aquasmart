import { Grid, Typography, Container } from '@mui/material'
import DashboardCard from '../components/DashboardCard'
import { especies } from '../mocks/especies'

const Especies = () => {
  const imageFor = (name: string) => {
    const n = name.toLowerCase()
    if (n.includes('bagre capaz')) {
      return new URL('bagre%20capaz.png', import.meta.env.BASE_URL).toString()
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
