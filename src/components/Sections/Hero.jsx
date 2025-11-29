import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from '../Typewriter'
import './SectionStyles.css'

export default function Hero({ onSectionEnter }) {
    const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false
  })

  useEffect(() => {
    if (inView) {
      onSectionEnter?.()
    }
  }, [inView, onSectionEnter])

  return (
    <section ref={ref} data-section='hero' className="section hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typewriter 
                text="Hello, I'm Santiago"
                speed={100}
                className="section-title"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="section-subtitle"
              >
                Graphics Programmer, Gameplay Programmer, Research Assistant
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

Hero.defaultProps = {
  onSectionEnter: () => {}
}