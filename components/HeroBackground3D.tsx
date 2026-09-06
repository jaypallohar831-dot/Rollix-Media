'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Smooth Mouse Coordinates ──
const mouseTarget = { x: 0, y: 0 };
const mouseCurrent = { x: 0, y: 0 };

// ── 1. Digital Undulating Cyber Grid (Tech Floor) ──
function DigitalGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  // Store original z (or y) positions for wave deformation
  const originalPos = useMemo(() => {
    const geom = new THREE.PlaneGeometry(30, 24, 28, 24);
    return geom.attributes.position.array.slice();
  }, []);

  useFrame((state) => {
    if (!geomRef.current) return;
    const t = state.clock.getElapsedTime() * 0.8;
    const pos = geomRef.current.attributes.position;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const origX = originalPos[i];
      const origY = originalPos[i + 1];
      // Undulating digital terrain wave
      arr[i + 2] =
        Math.sin(origX * 0.4 + t) * 0.45 +
        Math.cos(origY * 0.4 + t * 0.8) * 0.35;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.3, 0, 0]}
      position={[0, -3.6, -3.5]}
    >
      <planeGeometry ref={geomRef} args={[30, 24, 28, 24]} />
      <meshBasicMaterial
        color="#D9822B"
        wireframe
        transparent
        opacity={0.16}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── 2. Digital Particle Field (Floating Data Nodes) ──
function DigitalParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 350;

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    return [pos, pos.slice()];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime() * 0.4;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle cosmic/digital drift
      arr[idx + 1] = initialPositions[idx + 1] + Math.sin(t + initialPositions[idx]) * 0.35;
      arr[idx] = initialPositions[idx] + Math.cos(t * 0.8 + initialPositions[idx + 1]) * 0.25;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#D9822B"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── 3. Digital Gyroscope Hologram (Nested Rotating Data Rings) ──
function DigitalGyroscope({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Floating motion
      groupRef.current.position.y = position[1] + Math.sin(t * 0.9) * 0.35;
      groupRef.current.position.x = position[0] + mouseCurrent.x * 0.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.4 * delta;
      ring1Ref.current.rotation.y += 0.5 * delta;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= 0.6 * delta;
      ring2Ref.current.rotation.z += 0.4 * delta;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= 0.3 * delta;
      ring3Ref.current.rotation.x -= 0.5 * delta;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.15;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.02, 8, 48]} />
        <meshBasicMaterial color="#D9822B" transparent opacity={0.6} />
      </mesh>
      {/* Middle Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.1, 0.02, 8, 40]} />
        <meshBasicMaterial color="#E8D5C0" transparent opacity={0.5} />
      </mesh>
      {/* Inner Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[0.7, 0.025, 8, 32]} />
        <meshBasicMaterial color="#D9822B" transparent opacity={0.7} />
      </mesh>
      {/* Pulsing Central Digital Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.28, 0]} />
        <meshBasicMaterial color="#FFA043" wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

// ── 4. Digital Wireframe Polygon with Inner Glowing Core ──
function DigitalHoloShape({
  position,
  scale,
  color,
  rotationSpeed,
  floatSpeed,
  phase,
  type,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  phase: number;
  type: 'icosahedron' | 'dodecahedron' | 'octahedron';
}) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  const geom = useMemo(() => {
    switch (type) {
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1, 0);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(1, 0);
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0);
    }
  }, [type]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const floatY = Math.sin(t * floatSpeed + phase) * 0.35;
    const floatX = Math.cos(t * floatSpeed * 0.8 + phase) * 0.2;

    const curX = position[0] + floatX + mouseCurrent.x * 0.6;
    const curY = position[1] + floatY + mouseCurrent.y * 0.6;

    if (outerRef.current) {
      outerRef.current.position.set(curX, curY, position[2]);
      outerRef.current.rotation.x += rotationSpeed[0] * delta;
      outerRef.current.rotation.y += rotationSpeed[1] * delta;
      outerRef.current.rotation.z += rotationSpeed[2] * delta;
    }
    if (innerRef.current) {
      innerRef.current.position.set(curX, curY, position[2]);
      innerRef.current.rotation.x -= rotationSpeed[0] * 1.3 * delta;
      innerRef.current.rotation.y -= rotationSpeed[1] * 1.3 * delta;
    }
  });

  return (
    <>
      {/* Outer Wireframe Mesh */}
      <mesh ref={outerRef} geometry={geom} scale={scale}>
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>
      {/* Inner Semi-transparent Faceted Core */}
      <mesh ref={innerRef} geometry={geom} scale={scale * 0.55}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.4}
          metalness={0.6}
          flatShading
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// ── 5. Main 3D Digital Scene ──
function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[6, 8, 6]} intensity={1.5} color="#FFF5EB" />
      <pointLight position={[-5, -2, 3]} intensity={1.2} color="#D9822B" />

      {/* 3D Cyber Wave Grid Ground */}
      <DigitalGrid />

      {/* Floating Constellation Data Particles */}
      <DigitalParticles />

      {/* Central-Right Digital Gyroscope Hologram (behind hero marquee) */}
      <DigitalGyroscope position={[3.6, -0.4, -2.8]} />

      {/* Left Top Holographic Icosahedron (behind main title) */}
      <DigitalHoloShape
        position={[-3.3, 1.3, -2.5]}
        scale={1.5}
        color="#D9822B"
        rotationSpeed={[0.3, 0.4, 0.2]}
        floatSpeed={0.9}
        phase={0}
        type="icosahedron"
      />

      {/* Left Bottom Holographic Dodecahedron */}
      <DigitalHoloShape
        position={[-2.2, -2.1, -2.8]}
        scale={1.4}
        color="#E29A4A"
        rotationSpeed={[0.25, 0.3, 0.2]}
        floatSpeed={0.8}
        phase={1.8}
        type="dodecahedron"
      />

      {/* Top Center Digital Octahedron */}
      <DigitalHoloShape
        position={[0.3, 2.5, -3.2]}
        scale={1.2}
        color="#F0E4D4"
        rotationSpeed={[0.35, 0.25, 0.3]}
        floatSpeed={1.1}
        phase={3.4}
        type="octahedron"
      />
    </>
  );
}

// ── Fallback ──
export function StaticGradientFallback() {
  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 20% 30%, rgba(217, 130, 43, 0.08) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 85% 65%, rgba(232, 213, 192, 0.12) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 50% 80%, rgba(240, 228, 212, 0.09) 0%, transparent 70%)
        `,
      }}
    />
  );
}

function checkWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCanRender(false);
      return;
    }

    // Check WebGL
    if (!checkWebGL()) {
      setCanRender(false);
      return;
    }

    setCanRender(true);

    // Mouse listener with smooth lerp
    const onMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onVisibilityChange = () => {
      setIsTabActive(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!canRender) {
    return <StaticGradientFallback />;
  }

  const frameloop = isVisible && isTabActive ? 'always' : 'never';

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          depth: false,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
