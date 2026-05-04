import { createContext, useContext, useState } from 'react'

const ScrollContext = createContext()

export const ScrollProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('hero')

  const value = {
    currentSection,
    setCurrentSection
  }

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider')
  }
  return context
}