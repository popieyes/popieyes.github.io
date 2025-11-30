import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'

import { Scene } from './components/Scene'


import LandingPage from './components/Sections/LandingPage'
import Hero from './components/Sections/Hero'
import About from './components/Sections/About'
import Skills from './components/Sections/Skills'
import Projects from './components/Sections/Projects'
import Contact from './components/Sections/Contact'
import SectionWheelHandler from './components/SectionWheelHandler'
import EasterEgg from './components/Sections/EasterEgg'
import { ScrollProvider,useScroll } from './hooks/useScrollContext'
import { Bvh } from '@react-three/drei'

function AppContent() {
  const { currentSection, setCurrentSection } = useScroll()

  const sectionCameras = {
    landing: { position: [2, 2, 0], lookAt: [0, 1.5, 0] },
    hero: { position: [0, 1, -0.05], lookAt: [-.40, 0.9, -0.06] },
    about: { position: [-0.15, 1, 0], lookAt: [-0.6, 0, 0] },
    projects: { position: [0.5, 1.3, 1.5], lookAt: [-.5, 1.3, 1.1] },
    skills: { position: [0.5, 1.25, -0.5], lookAt: [-2, 1, 0] },
    contact: { position: [0, 1, 1], lookAt: [-2, 0, 0] },
    easter: { position: [0.5, 0.6, 0.8], lookAt: [-0.8, 0.3, 0.5] }
  }

  const handleGetStarted = () => {
    // Animate camera to hero view
    setCurrentSection('hero')
  }

  const handleSectionEnter = (section) => {
    setCurrentSection(section)
  }
  

  return (
      <div style={{ height: '100vh', position: 'relative' }}>
        {/* 3D Scene */}
        <Canvas
          shadows
          camera={{ position: sectionCameras[currentSection].position, fov: 50 }}
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            zIndex: 0 
          }}
        >
      
       
          <Scene 
            currentSection={currentSection}
            sectionCameras={sectionCameras}
          />

      
       {/* Camera movements */}
        </Canvas>

        {/* UI Overlays */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {currentSection === 'landing' && (
            <LandingPage onGetStarted={handleGetStarted} />
          )}
          
          {currentSection !== 'landing' && (
            <div className="scroll-sections">
              <Hero
                onSectionEnter={() => handleSectionEnter('hero')} 
              />
              
              <About
                onSectionEnter={() => handleSectionEnter('about')} 
              />
             
              <Skills
                onSectionEnter={() => handleSectionEnter('skills')}
              />
           
              <Projects
                onSectionEnter={() => handleSectionEnter('projects')}
              />
              
              <Contact
                onSectionEnter={() => handleSectionEnter('contact')}
              />

              <EasterEgg
                onSectionEnter={() => handleSectionEnter('easter')}
              />
            </div>
          )}

        </div>
         <SectionWheelHandler />
      </div>
  )
}

function App() {
  return (
    <ScrollProvider>
      <AppContent/>
    </ScrollProvider>
  )
}

export default App