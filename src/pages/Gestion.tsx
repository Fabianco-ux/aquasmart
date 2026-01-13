import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

type Item = { concepto: string; tipo: 'Ingreso'|'Egreso'; monto: number }

export default function Gestion() {
  const [concepto, setConcepto] = useState('')
  const [tipo, setTipo] = useState<'Ingreso'|'Egreso'>('Ingreso')
  const [monto, setMonto] = useState<number>(0)
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('aquasmart-gestion')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('aquasmart-gestion', JSON.stringify(items))
  }, [items])

  const agregar = () => {
    if (!concepto || !monto) return
    setItems(prev => [...prev, { concepto, tipo, monto }])
    setConcepto(''); setMonto(0)
  }

  const roi = useMemo(() => {
    const ingresos = items.filter(i => i.tipo === 'Ingreso').reduce((a,b)=>a+b.monto,0)
    const egresos = items.filter(i => i.tipo === 'Egreso').reduce((a,b)=>a+b.monto,0)
    return egresos === 0 ? 0 : ((ingresos - egresos) / egresos) * 100
  }, [items])

  const chartData = useMemo(() => {
    const labels = items.map((_, i) => `#${i+1}`)
    const saldo = items.reduce<number[]>((acc, it, i) => {
      const prev = acc[i-1] ?? 0
      const next = prev + (it.tipo === 'Ingreso' ? it.monto : -it.monto)
      acc.push(next)
      return acc
    }, [])
    return {
      labels,
      datasets: [{ label: 'Saldo', data: saldo, borderColor: '#1976d2', backgroundColor: 'rgba(25,118,210,0.2)' }]
    }
  }, [items])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Gestión Financiera y Sostenibilidad</Typography>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField label="Concepto" value={concepto} onChange={(e)=>setConcepto(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField select label="Tipo" value={tipo} onChange={(e)=>setTipo(e.target.value as any)} fullWidth>
                <option value="Ingreso">Ingreso</option>
                <option value="Egreso">Egreso</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField type="number" label="Monto" value={monto} onChange={(e)=>setMonto(Number(e.target.value))} fullWidth />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button variant="contained" onClick={agregar} sx={{ height: '100%', width: '100%' }}>+</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography sx={{ mb: 1 }}>ROI (mock): {roi.toFixed(1)}%</Typography>
          <Box sx={{ height: 300 }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
