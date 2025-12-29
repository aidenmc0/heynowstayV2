import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function StoryOverlay() {
  const { steps, currentStep, updateStepContent, isAdmin } = useStore();
  const stepData = steps[currentStep];

  return (
    <div className={`max-w-lg w-full ${isAdmin ? 'ring-2 ring-white p-4' : ''}`}>
      {isAdmin ? (
        <input className="block w-full text-white bg-transparent font-serif text-3xl sm:text-4xl md:text-6xl font-bold mb-2 outline-none border-b border-dashed border-gray-400" defaultValue={stepData.title} onChange={(e) => updateStepContent(stepData.id, { title: e.target.value })} />
      ) : (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          // Mobile: text-3xl, Tablet: text-4xl, Desktop: text-6xl
          className="text-white font-serif text-3xl sm:text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg leading-tight"
        >
          {stepData.title}
        </motion.h2>
      )}

      {isAdmin ? (
         <input className="block w-full text-white bg-transparent font-sans text-lg sm:text-xl md:text-2xl italic mb-4 outline-none border-b border-dashed border-gray-400" defaultValue={stepData.subtitle} onChange={(e) => updateStepContent(stepData.id, { subtitle: e.target.value })} />
      ) : (
        <motion.h3 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/90 font-sans text-lg sm:text-xl md:text-2xl italic mb-4 drop-shadow-md"
        >
          {stepData.subtitle}
        </motion.h3>
      )}

      {isAdmin ? (
        <textarea className="block w-full text-gray-700 bg-white/50 p-2 rounded mb-4 text-lg outline-none" defaultValue={stepData.description} onChange={(e) => updateStepContent(stepData.id, { description: e.target.value })} />
      ) : (
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.6, duration: 0.8 }}
          // Mobile: พื้นหลังมืดกว่า (bg-black/40) เพื่อให้อ่านง่าย
          className="text-white/80 text-base sm:text-lg leading-relaxed drop-shadow-md bg-black/30 sm:bg-black/20 p-4 sm:p-6 rounded-lg backdrop-blur-sm"
        >
          {stepData.description}
        </motion.p>
      )}

      {/* CTA Button */}
      {currentStep === 5 && !isAdmin && (
        <motion.button 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-black font-serif text-base sm:text-lg rounded-full shadow-lg hover:bg-stone-200 transition-colors duration-300 w-full sm:w-auto"
        >
          Book Your Sanctuary
        </motion.button>
      )}
    </div>
  );
}
