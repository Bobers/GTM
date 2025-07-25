'use client';

import { useProjectStore } from '@/state/projectStore';
import { ClipboardCheck } from 'lucide-react';

interface ValidationMethodsBoxProps {
  projectId: string;
  stageIndex: number;
}

const validationOptions = [
  'Interviews',
  'Surveys',
  'Testing MVP',
  'Landing Page',
  'Social Media Test',
  'Email Campaign',
  'Paid Ads Test',
  'Community Feedback'
];

export default function ValidationMethodsBox({ projectId, stageIndex }: ValidationMethodsBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateStageData = useProjectStore((state) => state.updateStageData);

  if (!project) return null;

  const stage = project.stages[stageIndex];

  const handleMethodToggle = (method: string) => {
    const currentMethods = stage.validationMethods || [];
    let newMethods: string[];

    if (currentMethods.includes(method)) {
      newMethods = currentMethods.filter(m => m !== method);
    } else {
      // Limit to 3 methods
      if (currentMethods.length >= 3) {
        return;
      }
      newMethods = [...currentMethods, method];
    }

    updateStageData(projectId, stageIndex, {
      validationMethods: newMethods
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardCheck className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Validation</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Select at least 2 validation methods (max 3):
      </p>

      <div className="space-y-2">
        {validationOptions.map((method) => (
          <label
            key={method}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <input
              type="checkbox"
              checked={stage.validationMethods.includes(method)}
              onChange={() => handleMethodToggle(method)}
              className="w-4 h-4 text-green-600 rounded border-gray-300 
                focus:ring-green-500"
            />
            <span className="text-sm">{method}</span>
          </label>
        ))}
      </div>

      {stage.validationMethods.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-green-700">
            Selected: {stage.validationMethods.length}/3
          </p>
        </div>
      )}
    </div>
  );
}