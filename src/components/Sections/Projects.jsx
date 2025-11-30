import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './SectionStyles.css'

export default function Projects({ onSectionEnter }) {
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
    <section ref={ref} data-section="projects" className="section ">
      <div className="container">
        <div className="row">
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x:0}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              Projects
            </motion.h2>
            <motion.p
              className='section-subtitle'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1}}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Check out what I have been working on...
            </motion.p>
        
    <div class="projects py-5 section" id="projects">
            <div class="row g-4 row-projects"> 
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="project-link" href="project.html?id=project1">
                        <div class="project-card custom-card-styles">
                            <div class="project-media">
                                <img src="/images/projects-re4.png" alt="Re4 Inventory cover"/>
                                <div class="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div class="project-body">
                                <h3>Tetris Inventory</h3>
                                <p class="muted">Inventory inspired by <b>Resident Evil 4</b> in Unity.</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="project-link" href="project.html?id=project2">
                        <div class="project-card custom-card-styles">
                            <div class="project-media">
                                <img src="/images/projects-szero.png" alt="Subject Zero cover"/>
                                <div class="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div class="project-body">
                                <h3>Subject Zero</h3>
                                <p class="muted"><b>2D Survival Horror</b> videogame mixed <br></br>with Roguelike made in Unity.</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="project-link" href="project.html?id=project2">
                        <div class="project-card custom-card-styles">
                            <div class="project-media">
                                <img src="/images/projects-ninja.png" alt="Super Ninja Deathmatch cover"/>
                                <div class="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div class="project-body">
                                <h3>Super Ninja Deathmatch</h3>
                                <p class="muted">Casual competitive multiplayer online/local game. <br></br>With ninjas! :O</p>
                            </div>
                        </div>
                    </a>
                </div>
                </div>
            <div class="row g-4 row-projects"> 
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="project-link" href="project.html?id=project2">
                        <div class="project-card custom-card-styles">
                            <div class="project-media">
                                <img src="/images/opengl.png" alt="OpenGL Engine cover"/>
                                <div class="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div class="project-body">
                                <h3>OpenGL Engine</h3>
                                <p class="muted">Rendering engine made with OpenGl & C++ <br></br>with heuristic lighting techniques.</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="project-link" href="project.html?id=project2">
                        <div class="project-card custom-card-styles">
                            <div class="project-media">
                                <img src="/images/projects-waterShader.gif" alt="Water Toon Shader cover"/>
                                <div class="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div class="project-body">
                                <h3>Water Toon Shader</h3>
                                <p class="muted">Shader implemented in Unity with HLSL & GLSL.</p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-12 col-md-6 col-lg-4">
                    <a class="project-link" href="project.html?id=project2">
                        <div class="project-card custom-card-styles">
                            <div class="project-media">
                                <img src="/images/projects-nori.jpeg" alt="Nori cover"/>
                                <div class="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div class="project-body">
                                <h3>Nori Engine</h3>
                                <p class="muted">Physically based lighting implemented in Nori engine.</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            {/* <button>View More Projects</button> */}
        
        </div>
         
        </div>
      </div>
    </section>
  )
}