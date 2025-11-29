import { useScroll } from '../hooks/useScrollContext'
import { useRef, useEffect } from "react"

export default function SectionWheelHandler() {
  const { currentSection, setCurrentSection } = useScroll()
  const scrollTimeout = useRef(null)
  const currentSectionRef = useRef(currentSection)
  
  const sections = ['hero', 'about', 'skills', 'projects', 'contact', 'easter']

  // Keep ref in sync
  useEffect(() => {
    currentSectionRef.current = currentSection
  }, [currentSection])

  // Function to scroll to a specific section
  const scrollToSection = (sectionName) => {
    const sectionElement = document.querySelector(`[data-section="${sectionName}"]`)
    if (sectionElement) {
      /* console.log("Scrolling " + sectionName + "into view") */
      sectionElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' // Align to top of viewport
      })
    }
  }

  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollTimeout.current) {
        event.preventDefault()
        return
      }

      const delta = Math.sign(event.deltaY)
      const currentIndex = sections.indexOf(currentSectionRef.current)

      if (delta > 0 && currentIndex < sections.length - 1) {
        event.preventDefault()
        const nextSection = sections[currentIndex + 1]
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null }, 1000)
        
        setCurrentSection(nextSection)
        scrollToSection(nextSection) // Scroll to the section
        /* console.log("Moving to next section: " + nextSection) */
        
      } else if (delta < 0 && currentIndex > 0) {
        event.preventDefault()
        const prevSection = sections[currentIndex - 1]
        scrollTimeout.current = setTimeout(() => { scrollTimeout.current = null }, 1000)
        
        setCurrentSection(prevSection)
        scrollToSection(prevSection) // Scroll to the section
        /* console.log("Moving to previous section: " + prevSection) */
      }
    }

    document.addEventListener('wheel', handleWheel, { passive: false })
    return () => document.removeEventListener('wheel', handleWheel)
  }, [setCurrentSection, sections])

  return null
}