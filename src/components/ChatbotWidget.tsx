import { useState, useMemo, useRef, useEffect } from 'react'
import { Box, Paper, Typography, IconButton, TextField, Button, Divider, List, ListItem, ListItemText, Fade, Avatar, Switch, FormControlLabel } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { useChatbot } from '../context/ChatbotContext'

const ChatbotWidget = () => {
  const { messages, addMessage } = useChatbot()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [iaMode, setIaMode] = useState(true)
  const [pdfText, setPdfText] = useState('')
  const [pdfName, setPdfName] = useState('')
  const [loadingPdf, setLoadingPdf] = useState(false)
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

  const extractPdfText = async (file: File) => {
    const pdfjsLib = await import('pdfjs-dist')
    const workerSrc = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc

    const buffer = await file.arrayBuffer()
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) })
    const pdf = await loadingTask.promise

    let collectedText = ''
    const maxPages = Math.min(pdf.numPages, 8)

    for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ')
      collectedText += `${pageText}\n`
    }

    return collectedText.replace(/\s+/g, ' ').trim()
  }

  const onPdfSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0]
    if (!selected) return

    if (selected.type !== 'application/pdf') {
      addMessage({ from: 'bot', text: 'Solo se permiten archivos PDF.', timestamp: Date.now() })
      return
    }

    try {
      setLoadingPdf(true)
      const extracted = await extractPdfText(selected)
      if (!extracted) {
        addMessage({ from: 'bot', text: 'No pude extraer texto del PDF. Verifica que no sea escaneado como imagen.', timestamp: Date.now() })
        return
      }

      setPdfText(extracted)
      setPdfName(selected.name)
      addMessage({
        from: 'bot',
        text: `PDF cargado: ${selected.name}. Ya puedo responder usando su contenido.`,
        timestamp: Date.now()
      })
    } catch {
      addMessage({ from: 'bot', text: 'Ocurrió un error al leer el PDF.', timestamp: Date.now() })
    } finally {
      setLoadingPdf(false)
      event.target.value = ''
    }
  }

  const replyFromPdf = (question: string) => {
    if (!pdfText) return ''

    const words = question
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word.length >= 4)

    const sentences = pdfText
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter(Boolean)

    const relevant = sentences.filter((sentence) => {
      const lower = sentence.toLowerCase()
      return words.some((word) => lower.includes(word))
    })

    if (relevant.length > 0) {
      const snippet = relevant.slice(0, 2).join(' ')
      return iaMode
        ? `Según el PDF (${pdfName || 'documento'}): ${snippet}`
        : `PDF: ${snippet}`
    }

    const fallback = sentences.slice(0, 2).join(' ')
    return iaMode
      ? `No encontré coincidencias exactas en tu pregunta. Resumen inicial del PDF: ${fallback}`
      : `No encontré coincidencias exactas. PDF: ${fallback}`
  }

  const parseFishCount = (text: string) => {
    const normalized = text
      .toLowerCase()
      .replace(/,/g, '')
      .replace(/\./g, '')

    const milMatch = normalized.match(/(\d+)\s*mil/)
    if (milMatch) return Number(milMatch[1]) * 1000

    const countMatch = normalized.match(/(\d{3,6})\s*(alevines|peces|tilapias)?/)
    if (countMatch) return Number(countMatch[1])

    return null
  }

  const parseAverageWeightGrams = (text: string) => {
    const normalized = text.toLowerCase().replace(',', '.')
    const match = normalized.match(/(\d+(?:\.\d+)?)\s*(g|gr|gramos)/)
    return match ? Number(match[1]) : null
  }

  const parseFeedingRatePercent = (text: string, isAlevin: boolean) => {
    const normalized = text.toLowerCase().replace(',', '.')
    const match = normalized.match(/(\d+(?:\.\d+)?)\s*%/)
    if (match) return Number(match[1])
    return isAlevin ? 8 : 3
  }

  const generateFeedReply = (text: string) => {
    const fishCount = parseFishCount(text)
    const weightGrams = parseAverageWeightGrams(text)
    const isAlevin = text.toLowerCase().includes('alevin') || text.toLowerCase().includes('alevín')
    const feedingRate = parseFeedingRatePercent(text, isAlevin)

    if (!fishCount || !weightGrams) {
      return iaMode
        ? 'Para calcular alimento necesito al menos: número de peces y peso promedio en gramos. Ejemplo: "10 mil alevines de 5 g con ración 8%".'
        : 'Faltan datos: cantidad de peces y peso promedio (g).'
    }

    const gramsPerDay = fishCount * weightGrams * (feedingRate / 100)
    const kilosPerDay = gramsPerDay / 1000

    return iaMode
      ? `Estimación diaria: ${kilosPerDay.toFixed(2)} kg de alimento. Cálculo: ${fishCount} peces × ${weightGrams} g × ${feedingRate}% = ${gramsPerDay.toFixed(0)} g/día. Referencia orientativa; ajusta por consumo real y calidad de agua.`
      : `${kilosPerDay.toFixed(2)} kg/día (estimado).`
  }

  const diseaseReply = (text: string) => {
    const t = text.toLowerCase()

    if (t.includes('manchas') || t.includes('puntos blancos') || t.includes('ich')) {
      return iaMode
        ? 'Posible ictio (punto blanco). Señales: puntos blancos, roce contra superficies y respiración agitada. Acciones iniciales: mejorar oxigenación, revisar temperatura y aislar lotes afectados; confirma diagnóstico con técnico.'
        : 'Posible punto blanco; mejora agua y valida con técnico.'
    }

    if (t.includes('ulcer') || t.includes('lesion') || t.includes('herida') || t.includes('hemorrag')) {
      return iaMode
        ? 'Podría ser infección bacteriana (p. ej., Aeromonas/Columnaris). Revisa amonio/nitritos, reduce estrés por manejo y separa peces enfermos. Se recomienda evaluación sanitaria para tratamiento específico.'
        : 'Posible bacteriana; corrige calidad de agua y separa afectados.'
    }

    if (t.includes('ojos salidos') || t.includes('exoftalmia') || t.includes('nado erratico') || t.includes('strept')) {
      return iaMode
        ? 'Compatible con estreptococosis en tilapia: nado errático, exoftalmia y mortalidad súbita. Prioriza bioseguridad, retiro de mortalidad y confirmación de laboratorio para decisión terapéutica.'
        : 'Posible estreptococosis; aplica bioseguridad y confirma en laboratorio.'
    }

    return iaMode
      ? 'En tilapia, evalúa síntomas clave (manchas, úlceras, nado anormal, branquias pálidas), calidad de agua y mortalidad diaria. Si me das síntomas concretos, te doy una hipótesis y acciones iniciales.'
      : 'Indica síntomas para sugerir enfermedad probable.'
  }

  const generateReply = (text: string) => {
    const t = text.toLowerCase()

    const asksFeedCalculation =
      t.includes('alimento') ||
      t.includes('racion') ||
      t.includes('ración') ||
      t.includes('cuanto debo usar') ||
      t.includes('cuánto debo usar')

    if (asksFeedCalculation) {
      return generateFeedReply(text)
    }

    const asksDisease =
      t.includes('enfermedad') ||
      t.includes('enfermedades') ||
      t.includes('sintoma') ||
      t.includes('síntoma') ||
      t.includes('mortalidad') ||
      t.includes('tilapia enferma')

    if (asksDisease) {
      return diseaseReply(text)
    }

    if (pdfText) {
      return replyFromPdf(text)
    }

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
              <Button
                component="label"
                variant="outlined"
                size="small"
                disabled={loadingPdf}
                startIcon={<UploadFileIcon />}
              >
                {loadingPdf ? 'Cargando...' : 'PDF'}
                <input type="file" accept="application/pdf" hidden onChange={onPdfSelected} />
              </Button>
              <TextField
                size="small"
                fullWidth
                placeholder={pdfText ? `Pregunta sobre ${pdfName || 'el PDF'}...` : 'Escribe tu mensaje...'}
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
