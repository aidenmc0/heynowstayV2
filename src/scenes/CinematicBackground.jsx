import React, { useState, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

// ชุดรูปถ่ายจริง (เลือก ID ที่มั่นคงที่สุด และไม่ใช้ query parameter ที่ซับซ้อน)
const BACKGROUNDS = [
  '/assets/image/image1.avif',
  '/assets/image/image2.avif',
  '/assets/image/image3.avif',
  '/assets/image/image4.jpg',
  '/assets/image/image5.jpg',
  '/assets/image/image6.jpg',
];

export default function CinematicBackground() {
  const { size, camera } = useThree();
  const { currentStep } = useStore();

  // โหลด Texture ทั้งหมดมาก่อน
  const textures = useTexture(BACKGROUNDS);

  const opacity = useRef(1);
  const prevTextureRef = useRef(null);
  const transitionRef = useRef(null);

  // คำนวณ Scale ให้รูปเต็มจอแบบ Object-Fit Cover
  const aspect = size.width / size.height;
  const scale = 1.0;

  // Logic Cross-Fade
  useEffect(() => {
    if (transitionRef.current) return;

    prevTextureRef.current = textures[currentStep - 1] || textures[currentStep];
    opacity.current = 0;

    // อนิเมชัน Fade
    transitionRef.current = true;
    let frame;
    const animateTransition = () => {
      opacity.current += 0.02;

      if (opacity.current >= 1) {
        opacity.current = 1;
        prevTextureRef.current = null;
        transitionRef.current = false;
        cancelAnimationFrame(frame);
      } else {
        frame = requestAnimationFrame(animateTransition);
      }
    };
    animateTransition();
  }, [currentStep, textures]);

  const currentTexture = textures[currentStep];
  const prevTexture = prevTextureRef.current;

  return (
    <group>
      {/* --- Mesh รูปเก่า (จางหายไป) --- */}
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

      {/* --- Mesh รูปใหม่ (ค่อยๆ ชัดขึ้น) --- */}
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
