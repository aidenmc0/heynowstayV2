import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function StoryOverlay() {
  const { steps, currentStep, updateStepContent, isAdmin } = useStore();
  const stepData = steps[currentStep];

  return (
    <div className={`max-w-lg ${isAdmin ? 'ring-2 ring-white p-4' : ''}`}>
      {isAdmin ? (
        <input
          className="block w-full text-white bg-transparent font-serif text-4xl md:text-6xl font-bold mb-2 outline-none border-b border-dashed border-gray-400"
          defaultValue={stepData.title}
          onChange={(e) =>
            updateStepContent(stepData.id, { title: e.target.value })
          }
        />
      ) : (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white font-serif text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg"
        >
          {stepData.title}
        </motion.h2>
      )}

      {isAdmin ? (
        <input
          className="block w-full text-white bg-transparent font-sans text-xl md:text-2xl italic mb-4 outline-none border-b border-dashed border-gray-400"
          defaultValue={stepData.subtitle}
          onChange={(e) =>
            updateStepContent(stepData.id, { subtitle: e.target.value })
          }
        />
      ) : (
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-white/90 font-sans text-xl md:text-2xl italic mb-4 drop-shadow-md"
        >
          {stepData.subtitle}
        </motion.h3>
      )}

      {isAdmin ? (
        <textarea
          className="block w-full text-gray-700 bg-white/50 p-2 rounded mb-4 text-lg outline-none"
          defaultValue={stepData.description}
          onChange={(e) =>
            updateStepContent(stepData.id, { description: e.target.value })
          }
        />
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/80 text-lg leading-relaxed drop-shadow-md bg-black/20 p-4 rounded-lg backdrop-blur-sm"
        >
          {stepData.description}
        </motion.p>
      )}

      {currentStep === 5 && !isAdmin && (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-8 py-3 bg-white text-black font-serif text-lg rounded-full shadow-lg hover:bg-stone-200 transition-colors duration-300"
        >
          Book Your Sanctuary
        </motion.button>
      )}
    </div>
  );
}
