import {useFrame, useThree} from '@react-three/fiber';
import {useRef, useEffect} from 'react';
import InteractiveZones from '../Scene/InteractiveElements';
import * as THREE from 'three';

const PortfolioScene = ({ currentSection, cameraTarget, interactiveMode}) => {
    const { camera } = useThree();
    const cameraRef = useRef();
    const sceneGroup = useRef();

    // Define camera positions for each section
    const sectionCameras = {
    hero: { position: [0, 0.5, 7], lookAt: [0, 1, 0] },
    projects: { position: [5, 2, 8], lookAt: [2, 1, 0] },
    about: { position: [0, 3, 6], lookAt: [0, 2, 0] },
    skills: { position: [-5, 2, 8], lookAt: [-2, 1, 0] },
    contact: { position: [-5, 1, 8], lookAt: [-2, 0, 0] },
    path: { position: [0, 5, 10], lookAt: [0, 0, 0] },
  }
    // Smoothly animate camera to target position on section change
    // Smooth camera animation
     useFrame(() => {
    const target = sectionCameras[currentSection]
    if (!target) return

    // Smooth camera movement
    camera.position.lerp(
      new THREE.Vector3(...target.position), 
      0.05
    )
    
    // Smooth look-at
    const targetLookAt = new THREE.Vector3(...target.lookAt)
    camera.lookAt(targetLookAt)
  })

    return (
        <group ref={sceneGroup}>
            <perspectiveCamera ref={cameraRef} fov={50} position={[0, 0, 10]} />
            {/* Add your 3D objects and components here */}
          {/*   <mesh position={[0,0,0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>

            <mesh position={[3,1,0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color={'blue'} />
            </mesh>
 */}
             {/* Interactive zones for About section */}
            {/* {interactiveMode && (
                <InteractiveZones 
                setCameraTarget={cameraTarget}
                onZoneClick={(zone) => {
                    console.log(`Clicked on zone: ${zone.title}`);
                }}
                />
            )} */}
        
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
        </group>
    );
}

export default PortfolioScene;