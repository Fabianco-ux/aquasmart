import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Grid, MenuItem, TextField, Typography, Alert } from '@mui/material'
import type { Especie } from '../mocks/especies'

const ESPECIES: Especie[] = [
  { nombre: 'Tilapia', temp: '26-30°C', densidad: '10-20/m³', ciclo: '6-8 meses' },
  { nombre: 'Bocachico', temp: '24-28°C', densidad: '5-10/m³', ciclo: '8-10 meses' },
  { nombre: 'Cachama', temp: '25-30°C', densidad: '8-15/m³', ciclo: '7-9 meses' },
]

type FormData = {
  especie: string
  volumenM3: number
  temperaturaC: number
  tamanoPromedioG: number
  fechaSiembra: string
}

const defaultValues: FormData = {
  especie: 'Tilapia',
  volumenM3: 10,
  temperaturaC: 28,
  tamanoPromedioG: 20,
  fechaSiembra: new Date().toISOString().slice(0, 10),
}

export default function FormIntelligent() {
  const [data, setData] = useState<FormData>(() => {
    const saved = localStorage.getItem('aquasmart-produccion')
    return saved ? JSON.parse(saved) : defaultValues
  })
  const [msg, setMsg] = useState<string>('')

  const especieInfo = useMemo(() => ESPECIES.find(e => e.nombre === data.especie)!, [data.especie])

  useEffect(() => {
    // "IA" simulada: recomendaciones simples en base a tamaño/temperatura
    let recomendacion = ''
    if (data.tamanoPromedioG >= 100) recomendacion = 'Fase: Engorde. Considera densidad media.'
    else if (data.tamanoPromedioG >= 25) recomendacion = 'Fase: Pre-engorde. Ajusta alimentación al 3-4% del peso.'
    else recomendacion = 'Fase: Alevinos. Mantén 26-30°C y 5% del peso.'

    if (data.temperaturaC < 24) recomendacion += ' Temperatura baja: considera calentamiento o menor densidad.'
    if (data.temperaturaC > 31) recomendacion += ' Temperatura alta: mejora aireación.'

    setMsg(recomendacion.trim())
  }, [data.tamanoPromedioG, data.temperaturaC])

  const handleChange = (field: keyof FormData, value: string | number) => {
    setData(prev => ({ ...prev, [field]: typeof value === 'string' && field !== 'especie' ? value : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('aquasmart-produccion', JSON.stringify(data))
    alert('Registro guardado en este equipo (localStorage).')
  }

  useEffect(() => {
    // Autollenado por especie
    if (data.especie && especieInfo) {
      // Podríamos ajustar temperatura por especie si se desea
    }
  }, [data.especie, especieInfo])

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>Plantilla por especie</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            label="Especie"
            value={data.especie}
            onChange={(e) => handleChange('especie', e.target.value)}
            fullWidth
          >
            {ESPECIES.map(e => (
              <MenuItem key={e.nombre} value={e.nombre}>{e.nombre}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="date"
            label="Fecha de siembra"
            value={data.fechaSiembra}
            onChange={(e) => handleChange('fechaSiembra', e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            label={`Volumen (m³) — sugerido ${especieInfo?.densidad}`}
            value={data.volumenM3}
            onChange={(e) => handleChange('volumenM3', Number(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            label="Temperatura (°C)"
            value={data.temperaturaC}
            onChange={(e) => handleChange('temperaturaC', Number(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            type="number"
            label="Tamaño promedio (g)"
            value={data.tamanoPromedioG}
            onChange={(e) => handleChange('tamanoPromedioG', Number(e.target.value))}
            fullWidth
          />
        </Grid>
      </Grid>
      {msg && <Alert sx={{ mt: 2 }} severity="info">{msg}</Alert>}
      <Typography variant="body2" sx={{ mt: 1 }}>
        {`Guías para ${especieInfo?.nombre}: Temp ${especieInfo?.temp}, Densidad ${especieInfo?.densidad}, Ciclo ${especieInfo?.ciclo}.`}
      </Typography>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Guardar</Button>
    </Box>
  )
}
