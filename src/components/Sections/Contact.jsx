import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './SectionStyles.css'

export default function Contact({ onSectionEnter }) {
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
    <section ref={ref} data-section="contact" className="section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x:0}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              Contact
            </motion.h2>
            <motion.p
              className='section-subtitle'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Hit me up on social media or through an email!
            </motion.p>
          </div>
        </div>
      </div>
      <div className='container flex-grow-big align-center'>
        <div className='section-content contact-links'>
          <motion.span>
            <a href="mailto:santiago.mgomez@urjc.es" class="fa fa-envelope"></a>
            <a href="https://www.linkedin.com/in/santiago-meneses-g%C3%B3mez-97255b265/" class="fab fa-linkedin"></a>
            <a href="https://github.com/popieyes" class="fab fa-github"></a>
            <a href="https://popeyecsm.itch.io/" class="fab fa-itch-io"></a>
            
          </motion.span>
        </div>
      </div>
    </section>
  )
}