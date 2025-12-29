import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

const BACKGROUNDS = [
  '/image/image1.avif',
  '/image/image2.avif',
  '/image/image3.avif',
  '/image/image4.jpg',
  '/image/image5.jpg',
  '/image/image6.jpg',
];

useTexture.preload(BACKGROUNDS);

export default function CinematicBackground() {
  const { size } = useThree();
  const { currentStep } = useStore();

  const textures = useTexture(BACKGROUNDS, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const opacity = useRef(1);
  const prevTextureRef = useRef(null);
  const transitioning = useRef(false);

  const aspect = size.width / size.height;
  const index = Math.min(Math.max(currentStep, 0), textures.length - 1);

  useEffect(() => {
    if (transitioning.current) return;

    prevTextureRef.current = textures[index - 1] || null;
    opacity.current = 0;
    transitioning.current = true;

    const animate = () => {
      opacity.current += 0.03;
      if (opacity.current >= 1) {
        opacity.current = 1;
        prevTextureRef.current = null;
        transitioning.current = false;
        return;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [index, textures]);

  return (
    <group>
      {prevTextureRef.current && (
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[20 * aspect, 20]} />
          <meshBasicMaterial
            map={prevTextureRef.current}
            transparent
            opacity={1 - opacity.current}
            toneMapped={false}
          />
        </mesh>
      )}

      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[20 * aspect, 20]} />
        <meshBasicMaterial
          map={textures[index]}
          transparent
          opacity={opacity.current}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
