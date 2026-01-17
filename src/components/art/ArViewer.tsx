
import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ArViewerProps {
    imageUrl: string;
}

const ArtPiece = ({ imageUrl }: { imageUrl: string }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(THREE.TextureLoader, imageUrl);

    useFrame((state) => {
        if (meshRef.current) {
            // Subtle breathing animation
            meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
            meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        }
    });

    return (
        <group>
            <Float
                speed={2} // Animation speed
                rotationIntensity={0.5} // XYZ rotation intensity
                floatIntensity={0.5} // Up/down float intensity
            >
                <mesh ref={meshRef} position={[0, 0, 0]}>
                    {/* Frame */}
                    <boxGeometry args={[3.2, 4.2, 0.2]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
                </mesh>

                {/* Canvas/Image */}
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[3, 4]} />
                    <meshBasicMaterial map={texture} toneMapped={false} />
                </mesh>
            </Float>
        </group>
    );
};

export const ArViewer = ({ imageUrl }: ArViewerProps) => {
    return (
        <div className="w-full h-[500px] md:h-[600px] bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden border border-white/10 relative shadow-2xl">
            <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live 3D View
                </span>
            </div>

            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                <ArtPiece imageUrl={imageUrl} />

                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
                <Environment preset="city" />
                <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#fea02e" />

                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={1}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>

            <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
                <p className="text-white/30 text-xs font-sans uppercase tracking-widest">
                    Drag to Rotate
                </p>
            </div>
        </div>
    );
};
