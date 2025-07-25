'use client';

import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface GuidedSetupProps {
  onComplete: () => void;
}

const steps = [
  {
    target: '.market-truths-section',
    title: 'Start with Market Truths',
    description: 'Begin by writing down 3 things you know to be true about your target market. These are your foundational assumptions.',
    position: 'bottom'
  },
  {
    target: '.product-section',
    title: 'Define Your Product',
    description: 'Clearly articulate what your product is and what problem it solves. Be specific and concise.',
    position: 'right'
  },
  {
    target: '.pmf-cycle-section',
    title: 'The PMF Cycle',
    description: 'Click on any stage to start documenting your product-market fit journey. Begin with your hypothesis.',
    position: 'top'
  },
  {
    target: '.target-customer-section',
    title: 'Identify Your Target Customer',
    description: 'Who exactly are you building for? The more specific, the better.',
    position: 'left'
  },
  {
    target: '.gtm-pillars-section',
    title: 'GTM Pillars',
    description: 'Document your competitive landscape, unique value proposition, and pricing strategy.',
    position: 'top'
  },
  {
    target: '.objectives-section',
    title: 'Set Your Objectives',
    description: 'What does success look like in 3-6 months? Set clear, measurable goals.',
    position: 'top'
  }
];

export default function GuidedSetup({ onComplete }: GuidedSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('gtm-onboarding-completed');
    if (hasCompletedOnboarding) {
      setIsVisible(false);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem('gtm-onboarding-completed', 'true');
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      {/* Spotlight effect - would need to calculate position based on target element */}
      <div 
        className="absolute w-full max-w-4xl mx-auto"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl p-6 pointer-events-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1 px-4 py-2 text-gray-600 hover:bg-gray-100 
                  rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white 
                  rounded-lg hover:bg-blue-700 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}