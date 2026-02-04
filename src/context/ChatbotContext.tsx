import React, { createContext, useContext, useState, ReactNode } from 'react'

export type ChatMessage = {
  from: 'user' | 'bot'
  text: string
  timestamp: number
}

type ChatbotContextValue = {
  messages: ChatMessage[]
  addMessage: (msg: ChatMessage) => void
  clear: () => void
}

const ChatbotContext = createContext<ChatbotContextValue | undefined>(undefined)

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const addMessage = (msg: ChatMessage) => setMessages((prev) => [...prev, msg])
  const clear = () => setMessages([])

  return (
    <ChatbotContext.Provider value={{ messages, addMessage, clear }}>
      {children}
    </ChatbotContext.Provider>
  )
}

export const useChatbot = () => {
  const ctx = useContext(ChatbotContext)
  if (!ctx) throw new Error('useChatbot must be used within ChatbotProvider')
  return ctx
}
