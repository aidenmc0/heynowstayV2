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
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 1000 }}
        gl={{ alpha: false, antialias: true }}
      >
        <Suspense fallback={null}>
          <World />
          <CameraController />
        </Suspense>
      </Canvas>

      {/* --- Vignette Overlay: ทำให้ภาพดูอิ่มตัว หรูหรา --- */}
      <div className="absolute inset-0 z-0 vignette-overlay" />

      {/* UI Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-16 z-10">
        {/* Header */}
        <header className="flex justify-between items-start pointer-events-auto">
          <div className="glass-panel px-6 py-2.5 rounded-full flex items-center gap-3 shadow-lg border-white/10 backdrop-blur-md">
            <div className="w-2.5 h-2.5 bg-luxury-gold rounded-full animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
              Khao Sok Sanctuary
            </span>
          </div>
          <AdminPanel />
        </header>

        {/* Main Content */}
        <main
          className={`flex-1 flex flex-col ${
            currentStep % 2 === 0
              ? 'items-start text-left'
              : 'items-end text-right'
          } justify-center pointer-events-auto transition-all duration-[2000ms] ease-in-out`}
        >
          <div
            className={`w-full max-w-3xl ${
              currentStep % 2 === 0 ? 'pr-0 md:pr-32' : 'pl-0 md:pl-32'
            }`}
          >
            <AnimatePresence mode="wait">
              <StoryOverlay key={currentStep} />
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <Navigation />
      </div>
    </div>
  );
}

export default App;
