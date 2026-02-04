import { Container, Typography, Grid, Paper, Divider } from '@mui/material'
import { useParams } from 'react-router-dom'
import { speciesData, SpeciesId } from '../data/species'

const SpeciesPage = () => {
  const { speciesId } = useParams()
  const id = (speciesId || '') as SpeciesId
  const data = speciesData[id as SpeciesId]

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Especie no encontrada</Typography>
        <Typography>Verifica el enlace o regresa al listado de especies.</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{data.name}</Typography>
      <Typography variant="subtitle1" gutterBottom>{data.scientific}</Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Temperatura</Typography>
            <Typography>{data.temperature}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Densidad</Typography>
            <Typography>{data.density}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Ciclo productivo</Typography>
            <Typography>{data.cycle}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Oxígeno disuelto</Typography>
            <Typography>{data.oxygen}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">pH</Typography>
            <Typography>{data.pH}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Alimentación</Typography>
            <Typography>{data.feeding}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1">{data.notes}</Typography>
      </Paper>
    </Container>
  )
}

export default SpeciesPage
