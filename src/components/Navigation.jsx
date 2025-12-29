import React from 'react';
import { useStore } from '../store/useStore';

export default function Navigation() {
  const { currentStep, steps, setStep, nextStep, prevStep } = useStore();

  return (
    // Footer: ให้วางอยู่ด้านล่างอย่างชิด
    <footer className="flex flex-col justify-between items-center w-full gap-6 sm:gap-4 pointer-events-auto pb-4">
      
      {/* Progress Dots */}
      <div className="flex gap-3 sm:gap-4 order-2 sm:order-1">
        {steps.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setStep(idx)} 
            // Mobile: เว้นระยะห่างน้อยลง (gap-3), Desktop: gap-4
            className={`h-1 rounded-full transition-all duration-500 ${
              currentStep === idx ? 'w-8 sm:w-8 bg-luxury-gold' : 'w-2 sm:w-2 bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="flex gap-8 sm:gap-4 order-1 sm:order-2">
        {/* Left Button */}
        <button 
          onClick={prevStep} 
          disabled={currentStep === 0}
          className={`p-4 sm:p-3 rounded-full glass-panel transition-all backdrop-blur-md ${
            currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95'
          }`}
        >
          {/* Mobile Icon: เล็กหน่อย */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Button */}
        <button 
          onClick={nextStep} 
          disabled={currentStep === steps.length - 1}
          className={`p-4 sm:p-3 rounded-full glass-panel transition-all backdrop-blur-md ${
            currentStep === steps.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 active:scale-95'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
