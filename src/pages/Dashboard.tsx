import { Grid, Typography, Container, Box } from '@mui/material'
import DashboardCard from '../components/DashboardCard'
import mockData from '../mocks/data.json'

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2, mb: 2 }}>
        <img
          src={new URL('logo.png', new URL(import.meta.env.BASE_URL, window.location.origin)).toString()}
          alt="AquaSmart Logo"
          style={{ height: 80 }}
        />
      </Box>
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
