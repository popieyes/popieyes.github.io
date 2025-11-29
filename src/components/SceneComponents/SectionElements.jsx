// Decorative elements that change per section
function SectionElements({ currentSection }) {
  return (
    <>
      {/* Hero section elements */}
      {(currentSection === 'hero' || currentSection === 'landing') && (
        <>
          <mesh position={[3, 2, -2]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#4f46e5" />
          </mesh>
          
          <mesh position={[-3, 1.5, -1]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial color="#ec4899" />
          </mesh>
        </>
      )}
      
      {/* About section elements */}
      {currentSection === 'about' && (
        <>
          <mesh position={[2, 3, 1]}>
            <torusGeometry args={[1, 0.3, 16, 32]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        </>
      )}
      
      {/* Projects section elements */}
      {currentSection === 'projects' && (
        <>
          <mesh position={[-1, 5, 2]} rotation={[Math.PI/4, 0, Math.PI/4]}>
            <octahedronGeometry args={[0.8]} />
            <meshStandardMaterial color="#f59e0b" />
          </mesh>
        </>
      )}
    </>
  )
}

export default SectionElements;