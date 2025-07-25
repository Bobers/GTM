'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { PMF_Cycle_Iteration } from '@/lib/types';

interface PmfCycleStageModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: 'hypothesis' | 'test' | 'analyze' | 'decision';
  currentIteration?: PMF_Cycle_Iteration;
  onSave: (data: Partial<PMF_Cycle_Iteration>) => void;
  onDecision?: (decision: 'pivot' | 'validate') => void;
}

const stageContent = {
  hypothesis: {
    title: 'Product Hypothesis',
    description: 'What do you believe about your product-market fit?',
    field: 'productHypothesis',
    placeholder: 'We believe that [target customer] will [key action] because [value proposition]...'
  },
  test: {
    title: 'Test Plan',
    description: 'How will you test your hypothesis?',
    field: 'testPlan',
    placeholder: 'We will test this by [method] with [number] of [target audience] over [timeframe]...'
  },
  analyze: {
    title: 'Learnings & Analysis',
    description: 'What did you learn from your tests?',
    field: 'learnings',
    placeholder: 'We learned that [key insight]. The data shows [metrics/feedback]...'
  },
  decision: {
    title: 'Decision Point',
    description: 'Based on your learnings, what&apos;s your next move?',
    field: 'decision',
    placeholder: 'Review your learnings and decide whether to pivot or validate.'
  }
};

export default function PmfCycleStageModal({
  isOpen,
  onClose,
  stage,
  currentIteration,
  onSave,
  onDecision
}: PmfCycleStageModalProps) {
  const [inputValue, setInputValue] = useState('');
  const content = stageContent[stage];

  useEffect(() => {
    if (currentIteration && stage !== 'decision') {
      const field = content.field as keyof PMF_Cycle_Iteration;
      setInputValue(currentIteration[field] as string || '');
    }
  }, [currentIteration, stage, content.field]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (stage !== 'decision') {
      onSave({ [content.field]: inputValue });
    }
    onClose();
  };

  const handleDecisionClick = (decision: 'pivot' | 'validate') => {
    if (onDecision) {
      onDecision(decision);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{content.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">{content.description}</p>
          
          {stage !== 'decision' ? (
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={content.placeholder}
              className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg 
                focus:border-blue-500 focus:outline-none resize-none"
            />
          ) : (
            <div className="space-y-4">
              {currentIteration?.learnings && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">Your Learnings:</h3>
                  <p className="text-gray-700">{currentIteration.learnings}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleDecisionClick('pivot')}
                  className="p-6 bg-orange-50 border-2 border-orange-300 rounded-lg
                    hover:bg-orange-100 transition-colors text-center"
                >
                  <div className="text-3xl mb-2">🔄</div>
                  <h3 className="font-semibold text-orange-700 mb-1">Pivot</h3>
                  <p className="text-sm text-orange-600">
                    Try a different approach based on learnings
                  </p>
                </button>
                
                <button
                  onClick={() => handleDecisionClick('validate')}
                  className="p-6 bg-green-50 border-2 border-green-300 rounded-lg
                    hover:bg-green-100 transition-colors text-center"
                >
                  <div className="text-3xl mb-2">✅</div>
                  <h3 className="font-semibold text-green-700 mb-1">Validate</h3>
                  <p className="text-sm text-green-600">
                    Double down on what&apos;s working
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {stage !== 'decision' && (
          <div className="flex justify-end gap-3 p-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                hover:bg-blue-700 transition-colors"
            >
              Save & Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}