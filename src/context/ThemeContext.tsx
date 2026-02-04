import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material'

type ThemeContextValue = {
  darkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  const toggleTheme = () => setDarkMode((v) => !v)

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        ...(darkMode
          ? {
              text: {
                primary: '#7FFFD4', // aquamarina
                secondary: '#A7FFE8',
              },
              background: {
                default: '#0e1a1b',
                paper: '#162527',
              },
            }
          : {}),
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
      },
    })
  }, [darkMode])

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeMode = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider')
  return ctx
}
