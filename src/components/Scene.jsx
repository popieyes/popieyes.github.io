import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, DepthOfField,ToneMapping } from '@react-three/postprocessing'
import { useRef, useEffect, useState } from 'react'
import { BakeShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Floor } from './SceneComponents/Floor'
import { Office } from './SceneComponents/Models'

export function Scene({ currentSection, sectionCameras }) {
  const { camera } = useThree()

  const time = useRef(0);

  /* Light References */
  const ambientLightRef = useRef();
  const portraitSpotlightRef = useRef();
  const notebookLightRef = useRef();
  const blueLight = useRef();
  const redLight = useRef();
  const projectsLight = useRef();

  const spotlightTargetRef = useRef();
  const portraitTarget = useRef();

  const targetPosition = useRef(new THREE.Vector3())
  const targetQuaternion = useRef(new THREE.Quaternion())
  const basePosition = useRef(new THREE.Vector3())
  const baseRotation = useRef(new THREE.Euler())
  const isAnimating = useRef(true)
  const animationProgress = useRef(0)

  // Set initial intensities for lights
  const [targetIntensities, setTargetIntensities] = useState(
    {
      ambient: 0.02,
      portraitSpotlight: 10,
      notebookLight: 0,
      blueLight:0,
      redLight:0,
      projectsLight:0
    }
  )
  // Initialize
  useEffect(() => {
  targetPosition.current.copy(camera.position)
  targetQuaternion.current.copy(camera.quaternion)
  basePosition.current.copy(camera.position)
  baseRotation.current.copy(camera.rotation)
  }, [camera])

// When section changes
useEffect(() => {
  const newCamera = sectionCameras[currentSection]
  if (!newCamera) return

  // Set position target
  targetPosition.current.set(...newCamera.position)
  
  // Calculate target quaternion for lookAt
  const tempCamera = camera.clone()
  tempCamera.position.set(...newCamera.position)
  tempCamera.lookAt(new THREE.Vector3(...newCamera.lookAt))
  targetQuaternion.current.copy(tempCamera.quaternion)
  
  // Start animation
  isAnimating.current = true
  animationProgress.current = 0
}, [currentSection, camera])

useEffect(() => {
  switch(currentSection) {
      case 'hero':
        setTargetIntensities({
          ambient: 0.02,
          portraitSpotlight: 10,
          notebookLight: 0,
          blueLight:0,
          redLight:0,
          projectsLight:0
        })
        break
      case 'about':
        setTargetIntensities({
          ambient: 0.1,
          portraitSpotlight: 0,
          notebookLight: 0.04,
          blueLight:0,
          redLight:0,
          projectsLight:0
        })
        break
      case 'skills':
      case 'landing':
        setTargetIntensities({
          ambient: 0.1,
          portraitSpotlight: 0,
          notebookLight: 0,
          blueLight:0.3,
          redLight:1.5,
          projectsLight:0
        })
        break
      case 'projects':
        setTargetIntensities({
          ambient: 0.1,
          portraitSpotlight: 0,
          notebookLight: 0,
          blueLight:0,
          redLight:0,
          projectsLight:4
        })
        break
      case 'contact':
        setTargetIntensities({
          ambient: 0.1,
          portraitSpotlight: 0,
          notebookLight: 0,
          blueLight:0,
          redLight:0,
          projectsLight:0
        })
        break
      default:
        setTargetIntensities({
          ambient: 1.0,
          portraitSpotlight: 0,
          notebookLight: 0,
          blueLight:0,
          redLight:0,
          projectsLight:0
        })
    }
}, [currentSection])

// Smooth camera animation with quaternion SLERP
useFrame((state, delta) => {

  if (isAnimating.current) {
   
    animationProgress.current += delta * 0.02 
    
    const easedT = 1 - Math.pow(1 - Math.min(animationProgress.current, 1), 3)
    
    // Interpolate position
    camera.position.lerp(targetPosition.current, easedT)
    
    // Interpolate rotation using quaternion SLERP (smoother than lookAt)
    camera.quaternion.slerp(targetQuaternion.current, easedT)
    
    if (animationProgress.current >= 1) {
      isAnimating.current = false
      camera.position.copy(targetPosition.current)
      camera.quaternion.copy(targetQuaternion.current)

      // ✅ RESET basePosition ONLY when animation completes
      basePosition.current.copy(camera.position)
      baseRotation.current.copy(camera.rotation)
      time.current = 0
    }
  }
  else {


    // Make sure basePosition is valid before applying handheld
    if (basePosition.current.length() === 0) {
      basePosition.current.copy(camera.position)
      baseRotation.current.copy(camera.rotation)
    }

    const intensity = 0.1 // Reduced for smoother effect
    const frequency = 1.5 // Slightly slower for more natural movement
    time.current += delta
    const t = time.current * frequency
    // Smoother noise with smaller multipliers
    const posX = fbm(t, t * 0.7, t * 0.3) * intensity * 0.02  // Reduced from 0.1
    const posY = fbm(t * 0.8, t, t * 0.5) * intensity * 0.02  // Reduced from 0.1
    const posZ = fbm(t * 0.3, t * 0.5, t) * intensity * 0.01  // Reduced from 0.05
    
    // Much smaller rotation multipliers
    const rotX = fbm(t * 1.2, t * 0.4, t) * intensity * 0.002  // Reduced from 0.01
    const rotY = fbm(t * 0.6, t * 1.1, t) * intensity * 0.002  // Reduced from 0.01
    const rotZ = fbm(t, t * 0.9, t * 1.3) * intensity * 0.001  // Reduced from 0.005
    
     // Apply to camera with smoothing
    camera.position.x += (basePosition.current.x + posX - camera.position.x) * 0.1
    camera.position.y += (basePosition.current.y + posY - camera.position.y) * 0.1
    camera.position.z += (basePosition.current.z + posZ - camera.position.z) * 0.1
    
    camera.rotation.x += (baseRotation.current.x + rotX - camera.rotation.x) * 0.1
    camera.rotation.y += (baseRotation.current.y + rotY - camera.rotation.y) * 0.1
    camera.rotation.z += (baseRotation.current.z + rotZ - camera.rotation.z) * 0.1
  }
})

// Smoothly interpolate light intensities
  useFrame(() => {
    const lerpFactor = 0.1 // Adjust for speed (0.1 = smooth, 0.5 = faster)
    
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        ambientLightRef.current.intensity,
        targetIntensities.ambient,
        lerpFactor
      )
    }
    
    if (portraitSpotlightRef.current) {
      portraitSpotlightRef.current.intensity = THREE.MathUtils.lerp(
        portraitSpotlightRef.current.intensity,
        targetIntensities.portraitSpotlight,
        lerpFactor
      )
    }
    
    if (notebookLightRef.current) {
      notebookLightRef.current.intensity = THREE.MathUtils.lerp(
        notebookLightRef.current.intensity,
        targetIntensities.notebookLight,
        lerpFactor
      )
    }

    if (blueLight.current) {
      blueLight.current.intensity = THREE.MathUtils.lerp(
        blueLight.current.intensity,
        targetIntensities.blueLight,
        lerpFactor
      )
    }
    
    if (redLight.current) {
      redLight.current.intensity = THREE.MathUtils.lerp(
        redLight.current.intensity,
        targetIntensities.redLight,
        lerpFactor
      )
    }
    
    if (projectsLight.current) {
      projectsLight.current.intensity = THREE.MathUtils.lerp(
        projectsLight.current.intensity,
        targetIntensities.projectsLight,
        lerpFactor
      )
    }
  })

  return (
    <>

       {/* Postprocessing */}
        <EffectComposer>
          <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={0.5} />
          <ToneMapping/>
          {currentSection !== 'hero' && (
            <DepthOfField target={targetPosition.current} focalLength={0.8} bokehScale={5} />)}
          
        </EffectComposer>

      {/* Lighting */}
      <color attach="background" args={['#000000']} />
      {/* <directionalLight position={[5, 10, 5]} intensity={5} castShadow shadow-mapSize={2048} /> */}
      <ambientLight ref= {ambientLightRef} intensity={0.1} />

      <primitive
        ref={spotlightTargetRef}
        object={new THREE.Object3D()}
        position={[1,1.5,2]}
        />

      <primitive
        ref={portraitTarget}
        object={new THREE.Object3D()}
        position={[-0.5,1,-0.075]}
      />

      {/* Hero Section Elements */}
      
      <spotLight ref={portraitSpotlightRef} decay={5} penumbra={1} intensity={10} power={50} position={[-0.3,2, 0]} angle={0.09} castShadow shadow-mapSize={1024} shadow-bias={-0.0001}
        target={portraitTarget.current} />
        

      {/* About Section Elements */}
    
      <pointLight ref={notebookLightRef} position={[-.35, 0.9, -0.1]} intensity={0.04} distance={0.3} color={'white'}/>
     
      {/* Skills Section Elements */}
     
      <pointLight ref={redLight} position={[0.5, 1.2, -2]} intensity={1.5} color={'red'}/>
      <pointLight ref={blueLight} position={[-0.1, 1.15, -0.6]} intensity={0.3} color={'lightblue'}/>
     

      {/* Projects Section Elements */}
        <spotLight ref={projectsLight} decay={1} position={[4,2, 3]} angle={0.07} penumbra={1} intensity={4} castShadow shadow-mapSize={1024} shadow-bias={-0.0001}
       target={spotlightTargetRef.current} />
      {/* <spotLight decay={1} position={[0,4, 0]} angle={0.3} penumbra={1} intensity={1} castShadow shadow-mapSize={1024} shadow-bias={-0.0001} /> */}
    
      <Office/>
      <Floor />
      <BakeShadows/>
    </>
  )
}

function noise(x, y, z) {
  // Simple pseudo-random noise
  return Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453 % 1
}

// Smoother noise function
function smoothNoise(x, y, z) {
  // Fractional part for smoother interpolation
  const ix = Math.floor(x)
  const iy = Math.floor(y) 
  const iz = Math.floor(z)
  const fx = x - ix
  const fy = y - iy
  const fz = z - iz

  // Cubic interpolation for smoother results
  const n0 = noise(ix, iy, iz)
  const n1 = noise(ix + 1, iy, iz)
  const n2 = noise(ix, iy + 1, iz)
  const n3 = noise(ix + 1, iy + 1, iz)
  
  // Simple bilinear interpolation
  const x1 = n0 + (n1 - n0) * fx
  const x2 = n2 + (n3 - n2) * fx
  return x1 + (x2 - x1) * fy
}

// Multi-octave noise for more natural movement
function fbm(x, y, z, octaves = 2) {
  let value = 0
  let amplitude = 0.5
  let frequency = 1.0
  
  for (let i = 0; i < octaves; i++) {
    value += amplitude * smoothNoise(x * frequency, y * frequency, z * frequency)
    amplitude *= 0.5
    frequency *= 2.0
  }
  
  return value
}
