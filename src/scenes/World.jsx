import React from 'react';
import CinematicBackground from './CinematicBackground';

export default function World() {
  return (
    <>
      {/* เหลือแค่ Background และ Lighting เบาๆ */}
      <CinematicBackground />

      {/* Lighting เบาๆ เพื่อให้ภาพไม่ดูตาย */}
      <ambientLight intensity={0.2} />
    </>
  );
}
