import { Card, CardContent, CardActionArea, Typography, CardMedia } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface DashboardCardProps {
  title: string
  description: string
  link?: string
  imageSrc?: string
}

const DashboardCard = ({ title, description, link, imageSrc }: DashboardCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.25)'
      }}
    >
      {link ? (
        <CardActionArea component={RouterLink} to={link} sx={{ height: '100%' }}>
          {imageSrc && (
            <CardMedia component="img" image={imageSrc} alt={title} sx={{ height: 160, objectFit: 'cover' }} />
          )}
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
          {imageSrc && (
            <CardMedia component="img" image={imageSrc} alt={title} sx={{ height: 160, objectFit: 'cover', mb: 2 }} />
          )}
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
