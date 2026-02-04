import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface DashboardCardProps {
  title: string
  description: string
  link?: string
}

const DashboardCard = ({ title, description, link }: DashboardCardProps) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {link ? (
        <CardActionArea component={RouterLink} to={link} sx={{ height: '100%' }}>
          <CardContent sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h5" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      ) : (
        <CardContent sx={{ textAlign: 'center', p: 3 }}>
          <Typography variant="h5" component="div" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      )}
    </Card>
  )
}

export default DashboardCard
