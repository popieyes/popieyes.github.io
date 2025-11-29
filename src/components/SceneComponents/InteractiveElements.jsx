import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

const InteractiveZones = ({ setCameraTarget, onZoneClick }) => {
  const [hoveredZone, setHoveredZone] = useState(null)
  
  const zones = [
    { id: 1, position: [-2, 0, 0], color: 'red', title: 'Research', cameraPos: [-1, 0, 5] },
    { id: 2, position: [0, 0, 0], color: 'blue', title: 'Development', cameraPos: [0, 0, 5] },
    { id: 3, position: [2, 0, 0], color: 'green', title: 'Design', cameraPos: [1, 0, 5] }
  ]

  return (
    <group>
      {zones.map((zone) => (
        <mesh
          key={zone.id}
          position={zone.position}
          onPointerOver={() => setHoveredZone(zone.id)}
          onPointerOut={() => setHoveredZone(null)}
          onClick={() => {
            // Move camera closer to this zone
            setCameraTarget(zone.cameraPos)
            onZoneClick(zone)
          }}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color={zone.color} 
            transparent
            opacity={hoveredZone === zone.id ? 1 : 0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

export default InteractiveZones