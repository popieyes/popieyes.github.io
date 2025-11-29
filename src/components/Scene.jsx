import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, Suspense } from 'react'
import { BakeShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Floor } from './SceneComponents/Floor'
import { Office } from './SceneComponents/Models'

export function Scene({ currentSection, sectionCameras }) {
  const { camera } = useThree()

  const time = useRef(0);
  const ambientLightIntensity = useRef(0.1);
  
  const spotlightTargetRef = useRef();
  const portraitTarget = useRef();

  const targetPosition = useRef(new THREE.Vector3())
  const targetQuaternion = useRef(new THREE.Quaternion())
  const basePosition = useRef(new THREE.Vector3())
  const baseRotation = useRef(new THREE.Euler())
  const isAnimating = useRef(true)
  const animationProgress = useRef(0)

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

  return (
    <>
     
      {/* Lighting */}
      <color attach="background" args={['#000000']} />
      {/* <directionalLight position={[5, 10, 5]} intensity={5} castShadow shadow-mapSize={2048} /> */}
      <ambientLight intensity={0.1} />

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
      {currentSection === 'hero' && (
        <group>
          <spotLight decay={5} penumbra={1} intensity={10} power={50} position={[-0.3,2, 0]} angle={0.09} castShadow shadow-mapSize={1024} shadow-bias={-0.0001}
        target={portraitTarget.current} />
        </group>
      )}

      {/* About Section Elements */}
      {currentSection === 'about' && (
        <pointLight position={[-.35, 0.9, -0.1]} intensity={0.04} distance={0.3} color={'white'}/>
      )}

      {/* Skills Section Elements */}
      {(currentSection === 'skills' || currentSection === 'landing') && (
        <group>
          <pointLight position={[0.5, 1.2, -2]} intensity={1.5} color={'red'}/>
          <pointLight position={[-0.1, 1.15, -0.6]} intensity={0.3} color={'lightblue'}/>
        </group>
      )}

      {/* Projects Section Elements */}
      {currentSection === 'projects' && (
        <spotLight decay={1} position={[4,2, 3]} angle={0.07} penumbra={1} intensity={4} castShadow shadow-mapSize={1024} shadow-bias={-0.0001}
       target={spotlightTargetRef.current} />
      )}
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
