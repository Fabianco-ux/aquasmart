import { Box, Card, CardContent, Container, List, ListItem, ListItemText, Typography } from '@mui/material'

export default function Cosecha() {
  const pasos = [
    'Preparar cadena de frío',
    'Aturdimiento y sacrificio humanitario',
    'Eviscerado y fileteado',
    'Lavado con agua limpia',
    'Empaque y almacenamiento',
    'Disposición adecuada de residuos',
  ]

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Cosecha y Procesamiento</Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Sigue este paso-a-paso mock. Consejo ambiental: Reutiliza 70% del agua cuando sea posible.
          </Typography>
          <Box>
            <List>
              {pasos.map((p, i) => (
                <ListItem key={i}>
                  <ListItemText primary={`Paso ${i+1}`} secondary={p} />
                </ListItem>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
