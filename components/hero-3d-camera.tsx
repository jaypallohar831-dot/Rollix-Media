'use client';

import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader, MeshStandardMaterial, Group, Vector3 } from 'three';

/* ─────────────────────────────────────────
   POLAROID CAMERA 3D MODEL
   Loads the .obj file + PBR textures
   ───────────────────────────────────────── */
function PolaroidModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<Group>(null);

  // Load OBJ model
  const obj = useLoader(OBJLoader, '/assets/3d/camera.obj');
  // MUST CLONE to avoid mutating the useLoader cache (which causes WebGL Context Lost errors)
  const clonedObj = useMemo(() => obj.clone(), [obj]);

  // Create a lightweight material (no textures) to prevent WebGL Context Lost
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: '#2a2a2a',
      roughness: 0.4,
      metalness: 0.6,
      envMapIntensity: 1.2,
    });
  }, []);

  // Apply material to all meshes in the loaded OBJ
  useEffect(() => {
    if (clonedObj) {
      clonedObj.traverse((child: any) => {
        if (child.isMesh) {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [clonedObj, material]);

  // Animate: slow idle rotation + scroll-driven rotation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Idle rotation (slow cinematic spin)
    groupRef.current.rotation.y += delta * 0.15;

    // Scroll-driven tilt (camera tilts as you scroll)
    const targetRotX = scrollProgress * Math.PI * 0.4 - 0.2;
    groupRef.current.rotation.x +=
      (targetRotX - groupRef.current.rotation.x) * 0.05;

    // Scroll-driven vertical movement (floats up as you scroll)
    const targetY = -scrollProgress * 2 + 0.5;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * 0.05;

    // Subtle breathing/bobbing
    groupRef.current.position.y +=
      Math.sin(state.clock.elapsedTime * 0.8) * 0.003;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} scale={0.5} position={[0, -0.2, 0]} rotation={[0.1, 0, 0.05]}>
        <primitive object={clonedObj} />
      </group>
    </Float>
  );
}

/* ─────────────────────────────────────────
   SCENE SETUP — Lighting, Camera, Env
   ───────────────────────────────────────── */
function Scene({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.5, 3.5);
    camera.lookAt(new Vector3(0, 0.3, 0));
  }, [camera]);

  return (
    <>
      {/* Main key light — warm cinematic orange */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={2}
        color="#d4763c"
        castShadow
      />

      {/* Fill light — cool blue */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.5}
        color="#7890cc"
      />

      {/* Rim/back light — strong accent */}
      <directionalLight
        position={[0, 3, -4]}
        intensity={1.5}
        color="#d4763c"
      />

      {/* Ambient for base visibility */}
      <ambientLight intensity={0.3} color="#ffffff" />

      {/* Subtle warm point light */}
      <pointLight position={[2, 1, 2]} intensity={0.8} color="#ffaa66" distance={8} />

      {/* Environment map for reflections */}
      <Environment preset="city" />

      {/* The camera model */}
      <PolaroidModel scrollProgress={scrollProgress} />
    </>
  );
}

/* ─────────────────────────────────────────
   LOADING FALLBACK
   ───────────────────────────────────────── */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cinematic-orange/30 border-t-cinematic-orange" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">
          Loading 3D
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT — Hero3DCamera
   Renders the Three.js canvas with scroll sync
   ───────────────────────────────────────── */
export function Hero3DCamera() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Avoid SSR hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track scroll progress
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / Math.max(docHeight, 1), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  if (!isClient) {
    return <div ref={containerRef} className="absolute inset-0 z-[5]" />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[5] pointer-events-none"
      aria-hidden="true"
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          camera={{ fov: 35, near: 0.1, far: 100 }}
          style={{ background: 'transparent' }}
        >
          <Scene scrollProgress={scrollProgress} />
        </Canvas>
      </Suspense>
    </div>
  );
}
