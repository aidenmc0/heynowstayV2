import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currentStep: 0,
  steps: [
    {
      id: 0,
      title: 'The Arrival',
      subtitle: "Nature's Embrace",
      description:
        "Step away from the noise. Welcome to your sanctuary in the heart of Thailand's ancient rainforest.",
    },
    {
      id: 1,
      title: 'The Journey',
      subtitle: 'Into the Wild',
      description:
        'A gentle path winds through towering limestone cliffs and lush jungle, guiding you to tranquility.',
    },
    {
      id: 2,
      title: 'The Experience',
      subtitle: 'Pure Serenity',
      description:
        'Gather around the fire. Sip local coffee. Watch the jungle wake up or fall asleep.',
    },
    {
      id: 3,
      title: 'Accommodation',
      subtitle: 'Tents of Quiet Luxury',
      description:
        'Our eco-tents blend seamlessly with the environment, offering comfort without compromise.',
    },
    {
      id: 4,
      title: 'Nightfall',
      subtitle: 'Under the Stars',
      description:
        'As the sun sets, the forest comes alive. Experience the magic of the bioluminescent night.',
    },
    {
      id: 5,
      title: 'Your Invitation',
      subtitle: 'Begin the Journey',
      description:
        'The journey begins with a single step. Reserve your escape today.',
    },
  ],
  isAdmin: false,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  updateStepContent: (id, newContent) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === id ? { ...step, ...newContent } : step
      ),
    })),
}));
