"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Vortex({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const c1 = new THREE.Color("#6366f1");
    const c2 = new THREE.Color("#ec4899");
    const c3 = new THREE.Color("#22d3ee");

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 8 + 0.5;
      const height = (Math.random() - 0.5) * 12;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const t = Math.random();
      const color = t < 0.33 ? c1 : t < 0.66 ? c2 : c3;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      spd[i] = Math.random() * 0.3 + 0.1;
    }

    return { positions: pos, colors: col, speeds: spd };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = arr[ix];
      const z = arr[ix + 2];
      const radius = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x) + speeds[i] * 0.01;

      arr[ix] = Math.cos(angle) * radius;
      arr[ix + 2] = Math.sin(angle) * radius;
      arr[ix + 1] += Math.sin(t * speeds[i] + i) * 0.002;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.7} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function InnerRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
    </mesh>
  );
}

export default function VortexBackground({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="fixed inset-0 z-0" style={{ background: "radial-gradient(ellipse at 50% 30%, #0f0a2a 0%, #09090b 60%)" }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]}>
        <Vortex count={intensity > 1 ? 5000 : 3000} />
        <InnerRing />
      </Canvas>
    </div>
  );
}
