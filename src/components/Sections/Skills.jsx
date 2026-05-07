import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './SectionStyles.css'


export default function Skills({ onSectionEnter }) {
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
    <section ref={ref} data-section="skills" className="section skills-section">
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
              Skills
            </motion.h2>
            <motion.p
              className='section-subtitle'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Work in progress. Come back soon...
            </motion.p>
            <div className='section-content skills-content'>
            <div className="skills-grid">
                        <div className="skill">
                            <img src="images/tech-cpp.png" alt="C++"/>
                            <div className="skill-info">
                                <h4>C++</h4>
                                <small>Systems and engine-level programming</small>
                            </div>
                        </div>
                        <div className="skill">
                            <img src="images/tech-csharp.png" alt="C#"/>
                            <div className="skill-info">
                                <h4>C#</h4>
                                <small>Gameplay scripting and tools</small>
                            </div>
                        </div>
                        <div className="skill">
                            <img src="images/tech-python.png" alt="Python"/>
                            <div className="skill-info">
                                <h4>Python</h4>
                                <small>Prototyping and tooling</small>
                            </div>
                        </div>
                        <div className="skill">
                            <img src="images/tech-unity.png" alt="Unity"/>
                            <div className="skill-info">
                                <h4>Unity</h4>
                                <small>Engine experience & gameplay systems</small>
                            </div>
                        </div>
                        {/* <div className="skill">
                            <img src="images/tech-unreal.png" alt="Unreal"/>
                            <div className="skill-info">
                                <h4>Unreal</h4>
                                <small>Rendering and real-time pipelines</small>
                            </div>
                        </div> */}
                        <div className="skill">
                            <img src="images/tech-opengl.png" alt="Graphics"/>
                            <div className="skill-info">
                                <h4>Graphics APIs</h4>
                                <small>OpenGL / Vulkan / DirectX</small>
                            </div>
                        </div>
                        <div className="skill">
                            <img src="images/tech-ts.png" alt="TypeScript"/>
                            <div className="skill-info">
                                <h4>TypeScript</h4>
                                <small>React Web Development & pipelines</small>
                            </div>
                        </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}