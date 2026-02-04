import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function Soporte() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload = { nombre, telefono, mensaje, fecha: new Date().toISOString() }
    const list = JSON.parse(localStorage.getItem('aquasmart-soporte') || '[]')
    list.unshift(payload)
    localStorage.setItem('aquasmart-soporte', JSON.stringify(list))
    setConfirm('Solicitud guardada localmente. Un experto te contactará.')
    setNombre(''); setTelefono(''); setMensaje('')
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Soporte AquaExpert</Typography>
      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <TextField label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            <TextField label="Mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required multiline rows={3} />
            <Button type="submit" variant="contained">Solicitar visita</Button>
            {confirm && <Typography color="success.main">{confirm}</Typography>}
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
