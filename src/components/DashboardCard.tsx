import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface DashboardCardProps {
  title: string
  description: string
  icon: string
  link: string
}

const DashboardCard = ({ title, description, icon, link }: DashboardCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={RouterLink} to={link} sx={{ height: '100%' }}>
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Typography variant="h3" component="div" sx={{ mb: 2 }}>
            {icon}
          </Typography>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default DashboardCard
