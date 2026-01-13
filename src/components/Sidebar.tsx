import { Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const drawerWidth = 240

interface SidebarProps {
  items: { label: string; to: string }[]
}

export default function Sidebar({ items }: SidebarProps) {
  const location = useLocation()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        display: { xs: 'none', md: 'block' },
      }}
      open
    >
      <Toolbar />
      <List>
        {items.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton component={Link} to={item.to} selected={location.pathname.includes(item.to)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
