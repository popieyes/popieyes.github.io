import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export function Image({position, size, url}) {
    const texture = useLoader(THREE.TextureLoader, url);
    return (
        <mesh position={position} rotation={[0 * (Math.PI/180), 110 * (Math.PI/180), 0* (Math.PI/180)]} castShadow receiveShadow>
            <planeGeometry args={[size.width, size.height]} />
            <meshStandardMaterial attach="material" map={texture} toneMapped={true} />
        </mesh>
    )
}
