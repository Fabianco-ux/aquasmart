import { useState, useMemo, useRef, useEffect } from 'react'
import { Box, Paper, Typography, IconButton, TextField, Button, Divider, List, ListItem, ListItemText, Fade, Avatar, Switch, FormControlLabel } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useChatbot } from '../context/ChatbotContext'

const ChatbotWidget = () => {
  const { messages, addMessage } = useChatbot()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [iaMode, setIaMode] = useState(true)
  const listRef = useRef<HTMLUListElement>(null)

  const botName = 'AQUABOT'
  const botIcon = useMemo(() => {
    const base = new URL(import.meta.env.BASE_URL, window.location.origin)
    return new URL('aquabot.png', base).toString()
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  const generateReply = (text: string) => {
    const t = text.toLowerCase()
    if (t.includes('alimentacion') || t.includes('alimentación')) {
      return iaMode
        ? 'Recomendación: ajusta la ración al 2–6% del peso vivo según etapa. Alevines 8–10%, juveniles 4–6%, engorde 2–3%, pre-cosecha 1–2%.'
        : 'Raciones: 2–6% del peso vivo; más en etapas tempranas.'
    }
    if (t.includes('agua') || t.includes('calidad')) {
      return iaMode
        ? 'Parámetros: pH 6.5–9.0 según especie; oxígeno >5 mg/L (trucha >7 mg/L); temperatura acorde a especie.'
        : 'Controla pH, oxígeno y temperatura según la especie.'
    }
    if (t.includes('tilapia')) {
      return iaMode
        ? 'Tilapia: temp 26–30°C, oxígeno >5 mg/L, pH 7.0–9.0, ciclo 4–7 meses según variedad.'
        : 'Tilapia: 26–30°C, O2 >5 mg/L, pH 7–9.'
    }
    return iaMode
      ? 'Puedo ayudarte con tu cultivo. ¿Qué tema quieres revisar (alimentación, agua, especie)?'
      : 'No tengo datos específicos. Prueba con: alimentación, agua o tilapia.'
  }

  const send = () => {
    const text = input.trim()
    if (!text) return
    addMessage({ from: 'user', text, timestamp: Date.now() })
    const reply = generateReply(text)
    addMessage({ from: 'bot', text: reply, timestamp: Date.now() })
    setInput('')
  }

  return (
    <>
      {/* Botón flotante */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1300 }}>
        <IconButton
          aria-label="Abrir chatbot"
          onClick={() => setOpen(true)}
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: '#1976d2',
            boxShadow: 3,
            '&:hover': { bgcolor: '#1565c0' }
          }}
        >
          <Avatar src={botIcon} alt={botName} sx={{ width: 48, height: 48 }} />
        </IconButton>
      </Box>

      {/* Ventana de chat */}
      <Fade in={open} unmountOnExit>
        <Box sx={{ position: 'fixed', bottom: 90, right: 20, zIndex: 1300 }}>
          <Paper sx={{ width: 320, maxHeight: 420, display: 'flex', flexDirection: 'column', boxShadow: 6, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 1.5, borderBottom: '1px solid #eee' }}>
              <Avatar src={botIcon} alt={botName} sx={{ width: 36, height: 36, mr: 1 }} />
              <Typography variant="subtitle1" sx={{ flex: 1 }}>{botName}</Typography>
              <IconButton aria-label="Cerrar" onClick={() => setOpen(false)} size="small"><CloseIcon /></IconButton>
            </Box>

            <Box sx={{ p: 1, borderBottom: '1px solid #eee' }}>
              <FormControlLabel
                control={<Switch checked={iaMode} onChange={(e) => setIaMode(e.target.checked)} />}
                label={iaMode ? 'Modo IA' : 'Modo básico'}
              />
            </Box>

            <List ref={listRef} sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
              {messages.map((m, idx) => (
                <ListItem key={idx} sx={{ justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper sx={{ p: 1, bgcolor: m.from === 'user' ? '#e3f2fd' : '#f5f5f5' }}>
                    <ListItemText
                      primary={m.text}
                      secondary={new Date(m.timestamp).toLocaleTimeString()}
                    />
                  </Paper>
                </ListItem>
              ))}
            </List>

            <Divider />

            <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send() }}
              />
              <Button variant="contained" onClick={send}>Enviar</Button>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </>
  )
}

export default ChatbotWidget
