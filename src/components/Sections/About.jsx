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
    <section ref={ref} data-section="about" className="section about-section">
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
              About Me
            </motion.h2>
            <div className='section-content'>
             <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <b>Graphics Programmer currently working in the research team MSLab in Rey Juan Carlos University.</b>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Primarily, I enjoy myself working on gameplay architecture that enhance both users' and designers' experience in video games. 
              Additionally, I have a strong passion for computer graphics and real-time rendering techniques.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              In my work as a research assistant, 
              I focus on integrating a 
              full pipeline for the generation, 
              assembly and simulation of garment patterns.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              As of my free time, I like participating in game jams,  
              playing videogames, discovering new places, 
              going to the gym, taking pictures, drawing, writing songs, 
              travelling, going to the club...
              And the list goes on!
            </motion.p>
           
            </div>
            {/*  <motion.button 
              className=""
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              Let's Connect!
            </motion.button> */}
          </div>
        </div>
      </div>
    </section>
  )
}