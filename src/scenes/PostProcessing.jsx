import React from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function Effects() {
  return (
    <EffectComposer disableNormalPass>
      <Bloom
        luminanceThreshold={0.5}
        luminanceSmoothing={0.9}
        intensity={0.3} // แสงนุ่มๆ ไม่ฉุย
      />
    </EffectComposer>
  );
}
