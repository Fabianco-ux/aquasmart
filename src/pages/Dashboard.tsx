import { Grid, Typography, Container } from '@mui/material'
import DashboardCard from '../components/DashboardCard'
import mockData from '../mocks/data.json'

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
        Bienvenido a tu Dashboard AquaSmart
      </Typography>
      <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 4 }}>
        Simula tu cultivo en Venadillo, Tolima. Elige una sección para comenzar.
      </Typography>

      <Grid container spacing={3}>
        {mockData.cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <DashboardCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              link={card.link}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Dashboard
