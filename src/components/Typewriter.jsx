import { useState, useEffect } from 'react'

export function Typewriter({ text, speed = 100, className = '', loop = true}) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
    else if(loop)
    {
      const timer = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
      }, 6000);
       return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed])

  return <h1 className={className}>{displayText}</h1>
}