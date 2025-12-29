import React from 'react';
import { useStore } from '../store/useStore';

export default function Navigation() {
  const { currentStep, steps, setStep, nextStep, prevStep } = useStore();

  return (
    <footer className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pointer-events-auto">
      <div className="flex gap-3 order-2 md:order-1">
        {steps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              currentStep === idx
                ? 'w-8 bg-luxury-gold'
                : 'w-2 bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>
      <div className="flex gap-4 order-1 md:order-2">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`p-3 rounded-full glass-panel transition-all ${
            currentStep === 0
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/20'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className={`p-3 rounded-full glass-panel transition-all ${
            currentStep === steps.length - 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/20'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
