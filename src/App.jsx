




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
import ProjectPage from './components/Sections/ProjectDetails'
import { AppProvider, useAppContext } from './AppContext'
import Header from './components/Header'
import ProjectsDossier from './components/Sections/Projects'
import AboutAndContact from './components/Sections/About'
import ServiceRecord from './components/Sections/ServiceRecord'

function AppContent() {
  const {projectPageVisibility} = useAppContext();
  


  return (
      <div>
        <Header/>
        
        <Hero/>
        <AboutAndContact/>
        <Contact/>
        <ProjectsDossier/>
        
      </div>

  )
}

function App() {
  
  
  return (
    <ScrollProvider>
    <AppProvider>
      <AppContent/>
    </AppProvider>
    </ScrollProvider>
  )
}

export default App