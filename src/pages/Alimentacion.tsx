import { Box, Button, Card, CardContent, Container, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

export default function Alimentacion() {
  const [fase, setFase] = useState<'Alevinos'|'Pre-engorde'|'Engorde'>('Alevinos')
  const [peso, setPeso] = useState(10)
  const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0,10))

  const sugerencia = useMemo(() => {
    if (fase === 'Alevinos') return '3 veces/día, ~5% del peso vivo.'
    if (fase === 'Pre-engorde') return '2-3 veces/día, ~3-4% del peso vivo.'
    return '2 veces/día, ~2-3% del peso vivo.'
  }, [fase])

  const handleGuardar = () => {
    const payload = { fase, peso, fecha }
    localStorage.setItem('aquasmart-alimentacion', JSON.stringify(payload))
    alert('Horario guardado localmente.')
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Alimentación y Horarios</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField select fullWidth label="Fase" value={fase} onChange={(e) => setFase(e.target.value as any)}>
                <MenuItem value="Alevinos">Alevinos</MenuItem>
                <MenuItem value="Pre-engorde">Pre-engorde</MenuItem>
                <MenuItem value="Engorde">Engorde</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField type="number" fullWidth label="Peso promedio (g)" value={peso} onChange={(e) => setPeso(Number(e.target.value))} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField type="date" label="Fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
          <Typography sx={{ mt: 2 }}>Sugerencia: {sugerencia}</Typography>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" onClick={handleGuardar}>Guardar</Button>
            <Button sx={{ ml: 2 }} variant="outlined" onClick={() => alert('Recordatorio: Alimentar a las 8AM (mock).')}>Programar recordatorio</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
