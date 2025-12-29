import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

export default function CameraController() {
  const { camera } = useThree();
  const clock = React.useRef(new THREE.Clock());

  // กำหนดจุดสำหรับแต่ละภาพ
  const shots = [
    { x: 0, y: 0, zoom: 1.0 },
    { x: -0.8, y: 0.5, zoom: 1.1 },
    { x: 0.5, y: -0.3, zoom: 1.05 },
    { x: 0.2, y: 0.1, zoom: 1.0 },
    { x: -0.2, y: 0.2, zoom: 1.15 },
    { x: 0, y: 1.5, zoom: 1.0 },
  ];

  useFrame(() => {
    const state = useStore.getState();
    const target = shots[state.currentStep];
    const time = clock.current.getElapsedTime();

    if (target) {
      // Breathing Effect: สั่นเบาๆ อย่างละมุน (ลดค่าลงเหลือ 0.02)
      const driftX = Math.sin(time * 0.15) * 0.02;
      const driftY = Math.cos(time * 0.2) * 0.02;

      const targetPos = {
        x: target.x + driftX,
        y: target.y + driftY,
      };

      // Lerp ช้ามาก (0.005) เพื่อความหรูหรา (มั่นใจว่าไฟล์ CinematicBackground scale 20 ต้องเพียงพอ)
      camera.position.x += (targetPos.x - camera.position.x) * 0.005;
      camera.position.y += (targetPos.y - camera.position.y) * 0.005;

      // Ken Burns Zoom: ซูมช้าๆ (0.005)
      const zoomBase = target.zoom;
      const zoomDrift = Math.sin(time * 0.05) * 0.005;
      const targetZoom = zoomBase + zoomDrift;

      camera.zoom += (targetZoom - camera.zoom) * 0.005;
      camera.updateProjectionMatrix();

      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
