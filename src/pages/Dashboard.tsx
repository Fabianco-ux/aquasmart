import { Grid, Typography, Container, Box } from '@mui/material'
import DashboardCard from '../components/DashboardCard'
import mockData from '../mocks/data.json'

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Bienvenido a tu Dashboard AquaSmart
      </Typography>

      <Grid container spacing={3}>
        {mockData.cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <DashboardCard
              title={card.title}
              description={card.description}
              link={card.link}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Dashboard
