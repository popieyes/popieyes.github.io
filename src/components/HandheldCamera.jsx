import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

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

export function AdvancedHandheldCamera({ 
  intensity = 0.5,
  frequency = 1.5,
  isAnimating = true
}) {
  const { camera } = useThree()
  const time = useRef(0)
  const basePosition = useRef(new THREE.Vector3())
  const baseRotation = useRef(new THREE.Euler())
  const needsReset = useRef(false)

 useFrame((state, delta) => {
     if(isAnimating) {
        console.log("IsAnimating")
        needsReset.current = true
        return;
    }
    // Store base position/rotation if not set
    if (needsReset.current) {
        console.log("Resetting the positions")
        basePosition.current.copy(camera.position)
        baseRotation.current.copy(camera.rotation)
        needsReset.current = false
    }
    time.current += delta
    
    const t = time.current * frequency
    
    // Position wobble
    const posX = fbm(t, t * 0.7, t * 0.3) * intensity * 0.1
    const posY = fbm(t * 0.8, t, t * 0.5) * intensity * 0.1
    const posZ = fbm(t * 0.3, t * 0.5, t) * intensity * 0.05
    
    // Rotation wobble (small angles in radians)
    const rotX = fbm(t * 1.2, t * 0.4, t) * intensity * 0.01
    const rotY = fbm(t * 0.6, t * 1.1, t) * intensity * 0.01
    const rotZ = fbm(t, t * 0.9, t * 1.3) * intensity * 0.005
    
    // Apply to camera
    camera.position.x = basePosition.current.x + posX
    camera.position.y = basePosition.current.y + posY
    camera.position.z = basePosition.current.z + posZ
    
    camera.rotation.x = baseRotation.current.x + rotX
    camera.rotation.y = baseRotation.current.y + rotY
    camera.rotation.z = baseRotation.current.z + rotZ
  })

  return null // This is a camera effect, no render output
}