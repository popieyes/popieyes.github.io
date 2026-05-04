import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './SectionStyles.css'
import ProjectPage from './ProjectPage'
import { useAppContext } from '../../AppContext'

export default function Projects({ onSectionEnter }) {
   const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: false
  })
  const {projectPageVisible, setProjectPageVisibility} = useAppContext();
  const [currentProject, setCurrentProject] = useState({ hero: {}, discussions: []});
  const projectDiscussions = [
    {
      title: 'First Step',
      cover: '/images/projects-ninja.png',
      description: 'First iteration'
    },
    {
      title: 'First Step',
      cover: '/images/projects-ninja.png',
      description: 'First iteration'
    },
    {
      title: 'First Step',
      cover: '/images/projects-ninja.png',
      description: 'First iteration'
    },
    {
      title: 'First Step',
      cover: '/images/projects-ninja.png',
      description: 'First iteration'
    },
    {
      title: 'First Step',
      cover: '/images/projects-ninja.png',
      description: 'First iteration'
    },
  ];
  const projects = {
    're4' : {
        hero: {
            title: "Resident Evil Inventory",
            cover: '/images/projects-re4.png',
            description: 'Description'
        },
        discussions: projectDiscussions
    },
    'nori' : {
        hero: {
            title: "Nori - Path Tracer Renderer",
            cover: '/images/projects-nori.jpeg',
            description: 'Description'
        },
        discussions: projectDiscussions
    },
    'zero' : {
        hero: {
            title: "Subject Zero - Game",
            cover: '/images/projects-szero.png',
            description: 'Description'
        },
        discussions: projectDiscussions
    },
    'hernan' : {
        hero: {
            title: "Hernan - OpenGL Game Engine",
            cover: '/images/opengl.png',
            description: 'Description'
        },
        discussions: projectDiscussions
    },
    'watershader' : {
        hero: {
            title: "Water Toon Shader",
            cover: '/images/projects-waterShader.gif',
            description: 'Description'
        },
        discussions: projectDiscussions
    },
    'ninja' : {
        hero: {
            title: "Superninja Deathmatch",
            cover: '/images/projects-ninja.png',
            description: 'Description'
        },
        discussions: projectDiscussions
    }

  }
 
  useEffect(() => {
    if (inView) {
      onSectionEnter?.()
    }
  }, [inView, onSectionEnter])
    
  const handleShowProject = (id) => {
    setCurrentProject(projects[id]);
    setProjectPageVisibility(true);
  };
  return (
    <section ref={ref} data-section="projects" className="section ">
        {projectPageVisible && (<ProjectPage hero={currentProject.hero} discussions={currentProject.discussions}/>)}
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
        
    <div className="projects py-5 section" id="projects">
            <div className="row g-4 row-projects"> 
                <div className="col-12 col-md-6 col-lg-4">
                    <button className="project-link" onClick={() => handleShowProject('re4')} href="project.html?id=project1">
                        <div className="project-card custom-card-styles">
                            <div className="project-media">
                                <img src="/images/projects-re4.png" alt="Re4 Inventory cover"/>
                                <div className="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3>Tetris Inventory</h3>
                                <p className="muted">Inventory inspired by <b>Resident Evil 4</b> in Unity.</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <button className="project-link"  onClick={() => handleShowProject('zero')} href="project.html?id=project2">
                        <div className="project-card custom-card-styles">
                            <div className="project-media">
                                <img src="/images/projects-szero.png" alt="Subject Zero cover"/>
                                <div className="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3>Subject Zero</h3>
                                <p className="muted"><b>2D Survival Horror</b> videogame mixed <br></br>with Roguelike made in Unity.</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <button className="project-link" onClick={() => handleShowProject('ninja')} href="project.html?id=project2">
                        <div className="project-card custom-card-styles">
                            <div className="project-media">
                                <img src="/images/projects-ninja.png" alt="Super Ninja Deathmatch cover"/>
                                <div className="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3>Super Ninja Deathmatch</h3>
                                <p className="muted">Casual competitive multiplayer online/local game. <br></br>With ninjas! :O</p>
                            </div>
                        </div>
                    </button>
                </div>
                </div>
            <div className="row g-4 row-projects"> 
                <div className="col-12 col-md-6 col-lg-4">
                    <button className="project-link" onClick={() => handleShowProject('hernan')} href="project.html?id=project2">
                        <div className="project-card custom-card-styles">
                            <div className="project-media">
                                <img src="/images/opengl.png" alt="OpenGL Engine cover"/>
                                <div className="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3>OpenGL Engine</h3>
                                <p className="muted">Rendering engine made with OpenGl & C++ <br></br>with heuristic lighting techniques.</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <button className="project-link" onClick={() => handleShowProject('watershader')} href="project.html?id=project2">
                        <div className="project-card custom-card-styles">
                            <div className="project-media">
                                <img src="/images/projects-waterShader.gif" alt="Water Toon Shader cover"/>
                                <div className="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3>Water Toon Shader</h3>
                                <p className="muted">Shader implemented in Unity with HLSL & GLSL.</p>
                            </div>
                        </div>
                    </button>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <button className="project-link" onClick={() => handleShowProject('nori')} href="project.html?id=project2">
                        <div className="project-card custom-card-styles">
                            <div className="project-media">
                                <img src="/images/projects-nori.jpeg" alt="Nori cover"/>
                                <div className="project-media-overlay">
                                    <span>View Project</span>
                                </div>
                            </div>
                            <div className="project-body">
                                <h3>Nori Engine</h3>
                                <p className="muted">Physically based lighting implemented in Nori engine.</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            {/* <button>View More Projects</button> */}
        
        </div>
         
        </div>
      </div>

      
    </section>
  )
}