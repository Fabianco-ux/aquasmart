import { Box, Container, Typography } from '@mui/material'
import FormIntelligent from '../components/FormIntelligent'

export default function Produccion() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 1 }}>Control de Producción</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Registra tus siembras y variables. Este formulario incluye lógica "IA" simulada.
      </Typography>
      <Box>
        <FormIntelligent />
      </Box>
    </Container>
  )
}
