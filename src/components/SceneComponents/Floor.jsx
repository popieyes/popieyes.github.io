export function Floor() {
    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0,0,0]}
            receiveShadow
        >
            <planeGeometry args={[100, 100]} />
            {/* Use MeshReflectorMaterial for the blur/reflector props */}
            {/* If you prefer a plain material, replace with <meshStandardMaterial /> and remove reflector props. */}
            <meshStandardMaterial 
                color="#202020"
                metalness={0.8}
                roughness={1}
            />
            {/* <gridHelper
                args={[20, 20, 'gree', '#4b5563']}
                position={[0, 0.01, 0]}
            /> */}
        </mesh>
    )
}