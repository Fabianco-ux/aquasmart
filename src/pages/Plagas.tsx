import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'

export default function Plagas() {
  const [fileName, setFileName] = useState<string>('')
  const [resultado, setResultado] = useState<string>('')

  const handleAnalizar = () => {
    // "AR"/IA simulado: determinación simple en base al nombre del archivo
    if (!fileName) return setResultado('Sube una imagen para analizar.')
    const name = fileName.toLowerCase()
    if (name.includes('lesion') || name.includes('mancha')) setResultado('Posible Estreptococosis: Sugerencia: Florfenicol (consulta a un veterinario).')
    else if (name.includes('aleta')) setResultado('Aletas deshilachadas: revisar calidad de agua y densidad.')
    else setResultado('No se detectaron problemas evidentes en este mock.')
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Identificación de Plagas y Fallas</Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Sube una imagen y analiza para ver un remedio mock.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <TextField
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.target.files?.[0]?.name || '')}
              fullWidth
            />
            <Button variant="contained" onClick={handleAnalizar}>Analizar</Button>
          </Box>
          {resultado && <Typography variant="body1">{resultado}</Typography>}
        </CardContent>
      </Card>
    </Container>
  )
}
