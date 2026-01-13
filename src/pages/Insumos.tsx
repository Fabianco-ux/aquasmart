import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useMemo, useState } from 'react'

const DATA = [
  { nombre: 'Aireador básico', proveedor: 'TEMU', precio: '$50', url: '#' },
  { nombre: 'Red de pesca', proveedor: 'Local Store', precio: '$30', url: '#' },
  { nombre: 'Alimento balanceado 25kg', proveedor: 'Proveedor X', precio: '$45', url: '#' },
]

export default function Insumos() {
  const [q, setQ] = useState('')
  const rows = useMemo(() => DATA.filter(r => r.nombre.toLowerCase().includes(q.toLowerCase())), [q])
  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Insumos y Proveedores</Typography>
      <TextField fullWidth placeholder="Buscar insumo" value={q} onChange={(e) => setQ(e.target.value)} sx={{ mb: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Enlace</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.nombre}</TableCell>
                <TableCell>{r.proveedor}</TableCell>
                <TableCell>{r.precio}</TableCell>
                <TableCell><a href={r.url} target="_blank" rel="noreferrer">Ver</a></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
