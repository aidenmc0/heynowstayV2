import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { useStore } from '../store/useStore';

// ✅ import asset ให้ Vite จัดการ
import img1 from '@/assets/image/image1.jpg';
import img2 from '@/assets/image/image2.jpg';
import img3 from '@/assets/image/image3.jpg';
import img4 from '@/assets/image/image4.jpg';
import img5 from '@/assets/image/image5.jpg';
import img6 from '@/assets/image/image6.jpg';

const BACKGROUNDS = [img1, img2, img3, img4, img5, img6];

// preload ป้องกันกระตุก + context lost
useTexture.preload(BACKGROUNDS);

export default function CinematicBackground() {
  const { size } = useThree();
  const { currentStep } = useStore();

  const textures = useTexture(BACKGROUNDS);

  // 🛡 guard สำคัญมาก
  if (!textures || textures.some(t => !t)) return null;

  const opacity = useRef(1);
  const prevTextureRef = useRef(null);
  const transitioning = useRef(false);

  const aspect = size.width / size.height;

  useEffect(() => {
    if (transitioning.current) return;

    prevTextureRef.current =
      textures[currentStep - 1] ?? textures[currentStep];

    opacity.current = 0;
    transitioning.current = true;

    let raf;
    const animate = () => {
      opacity.current += 0.02;

      if (opacity.current >= 1) {
        opacity.current = 1;
        prevTextureRef.current = null;
        transitioning.current = false;
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(animate);
      }
    };

    animate();
  }, [currentStep, textures]);

  const currentTexture = textures[currentStep];
  const prevTexture = prevTextureRef.current;

  return (
    <group>
      {/* Previous background */}
      {prevTexture && (
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[20 * aspect, 20]} />
          <meshBasicMaterial
            map={prevTexture}
            transparent
            opacity={1 - opacity.current}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Current background */}
      {currentTexture && (
        <mesh position={[0, 0, -10]}>
          <planeGeometry args={[20 * aspect, 20]} />
          <meshBasicMaterial
            map={currentTexture}
            transparent
            opacity={opacity.current}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}
