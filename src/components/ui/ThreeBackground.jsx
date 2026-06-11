import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Animated particle mesh that reacts to mouse & scroll ── */
function ParticleField({ scrollY }) {
  const meshRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const [positions, colors] = useMemo(() => {
    const count = 4000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 18 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Green-white color blend
      const t = Math.random();
      col[i * 3]     = 0.13 + t * 0.87;
      col[i * 3 + 1] = 0.76 + t * 0.20;
      col[i * 3 + 2] = 0.37 + t * 0.55;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const scroll = scrollY.current / window.innerHeight;

    meshRef.current.rotation.y = t * 0.04 + mouseRef.current.x * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.03) * 0.15 + mouseRef.current.y * 0.15 + scroll * 0.4;
    meshRef.current.rotation.z = Math.cos(t * 0.02) * 0.05;

    // Wave the positions subtly
    const posAttr = meshRef.current.geometry.attributes.position;
    const orig = posAttr.array;
    for (let i = 0; i < orig.length / 3; i++) {
      const wave = Math.sin(t * 0.6 + i * 0.2) * 0.06;
      orig[i * 3 + 1] += wave * 0.01;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Wireframe connecting lines ── */
function ConnectionLines() {
  const ref = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points = [];
    const count = 120;
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z));
    }
    // connect each to 2 nearest
    const verts = [];
    for (let i = 0; i < points.length; i++) {
      const distances = points.map((p, j) => ({ d: points[i].distanceTo(p), j }))
        .sort((a, b) => a.d - b.d).slice(1, 3);
      distances.forEach(({ j }) => {
        verts.push(points[i].x, points[i].y, points[i].z);
        verts.push(points[j].x, points[j].y, points[j].z);
      });
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = -t * 0.02;
    ref.current.rotation.x = Math.sin(t * 0.015) * 0.1;
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#22c55e" transparent opacity={0.08} />
    </lineSegments>
  );
}

export default function ThreeBackground({ scrollYRef }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField scrollY={scrollYRef} />
        <ConnectionLines />
      </Canvas>
    </div>
  );
}
