import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import World from './scenes/World';
import CameraController from './scenes/CameraController';
import StoryOverlay from './components/StoryOverlay';
import Navigation from './components/Navigation';
import AdminPanel from './components/AdminPanel';
import { useStore } from './store/useStore';

function App() {
  const { currentStep, steps } = useStore();

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        dpr={[1, 2]} // ปรับความคมตามหน้าจอ (1=ประหยัด, 2=สวย)
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 1000 }}
        gl={{ alpha: false, antialias: true }}
      >
        <Suspense fallback={null}>
          <World />
          <CameraController />
        </Suspense>
      </Canvas>

      {/* Vignette Overlay (เงาขอบ) */}
      <div className="absolute inset-0 z-0 vignette-overlay pointer-events-none" />

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 md:p-16 z-10">
        
        {/* Header */}
        <header className="flex justify-between items-start pointer-events-auto w-full">
          {/* Mobile: Logo เล็กลง, Desktop: เหมือนเดิม */}
          <div className="glass-panel px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full flex items-center gap-2 sm:gap-3 shadow-lg border-white/10 backdrop-blur-md">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-luxury-gold rounded-full animate-pulse"></div>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.1em] uppercase text-white/90">
              Khao Sok
            </span>
          </div>
          {/* Mobile: ซ่อน Admin ไม่ให้กวน, Desktop: แสดงตามปกติ */}
          <div className="hidden sm:block">
             <AdminPanel />
          </div>
        </header>

        {/* Main Content Area */}
        {/* Logic: Mobile (justify-end) vs Desktop (justify-center) */}
        <main
          className={`flex-1 flex flex-col w-full transition-all duration-[2000ms] ease-in-out ${
            // Mobile: ชิดล่างตรงกลาง / Desktop: ซ้ายขวา
            'sm:justify-center justify-end items-center sm:items-center text-center sm:text-center' 
          }`}
        >
          <div className={`w-full ${currentStep % 2 === 0 ? 'sm:items-start text-left' : 'sm:items-end text-right'} flex flex-col items-center`}>
             {/* ปรับขนาด Container ให้พอดีกับหน้าจอ */}
            <div className={`w-full max-w-3xl sm:px-0 px-4`}>
              <AnimatePresence mode="wait">
                <StoryOverlay key={currentStep} />
              </AnimatePresence>
            </div>
          </div>
        </main>

        {/* Footer Navigation */}
        {/* Mobile: เว้นระยะห่างจากขอบล่างเพื่อความสวยงาม */}
        <Navigation />
      </div>
    </div>
  );
}

export default App;
