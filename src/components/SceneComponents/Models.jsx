import { useGLTF ,Gltf } from '@react-three/drei'
import { Suspense } from 'react'

export function Office(){
    return (
        <group>
            <Gltf 
            castShadow 
            receiveShadow 
            src="/models/office.glb" 
            position={[-0.5, 0, -1.2]} />
            <Gltf 
            castShadow 
            receiveShadow 
            src='/models/xbox.glb'
            position={[-0.36, 0.75, -0.15]}
            rotation={[0, -1, 0]}
            scale={0.15} />
            <Gltf
            castShadow
            receiveShadow
            src='/models/canon-hfix.glb'
            position={[-0.13, 0.755, -0.14]}
            rotation={[-1.6,0,2]}
            scale={0.8}
            />
        </group>
    )
}

/* 
"Office - Assets" 
(https://skfb.ly/os7nV) by Evan Petrov is licensed under Creative Commons Attribution
   (http://creativecommons.org/licenses/by/4.0/). */
   
/* "Xbox Inalambric Controller (Black)" 
(https://skfb.ly/o6Kou) by Chistodrako._. is licensed under Creative Commons Attribution
     (http://creativecommons.org/licenses/by/4.0/). */

/* "Canon AT-1 Retro Camera" (https://skfb.ly/6ZwNB) 
    by AleixoAlonso is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/). */