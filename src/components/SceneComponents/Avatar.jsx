export function Avatar({position =[0,0,0]}) {
    return (
        <group position= {position}>
             {/* Head */}
      <mesh castShadow position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>
      
      {/* Body */}
      <mesh castShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[0.4, 0.3, 1, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Arms */}
      <mesh castShadow position={[0.6, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      <mesh castShadow position={[-0.6, 1.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      
      {/* Legs */}
      <mesh castShadow position={[0.15, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
      
      <mesh castShadow position={[-0.15, 0.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
        </group>
    )
}