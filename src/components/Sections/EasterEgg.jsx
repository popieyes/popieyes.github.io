import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './SectionStyles.css'

export default function About({ onSectionEnter }) {
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
    <section ref={ref} data-section="easter" className="section about-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Easter Egg
            </motion.h2>
            <div className='section-content'>
             <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <b>You found me!</b>
            </motion.p>
        
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}