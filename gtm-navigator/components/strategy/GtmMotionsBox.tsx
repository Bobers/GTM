'use client';

import { useProjectStore } from '@/state/projectStore';
import { Zap } from 'lucide-react';

interface GtmMotionsBoxProps {
  projectId: string;
  stageIndex: number;
}

const gtmMotionOptions = [
  'Inbound',
  'Outbound',
  'Community',
  'Product-Led Growth',
  'Content Marketing',
  'Partnerships',
  'Events',
  'Referrals'
];

export default function GtmMotionsBox({ projectId, stageIndex }: GtmMotionsBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateStageData = useProjectStore((state) => state.updateStageData);

  if (!project) return null;

  const stage = project.stages[stageIndex];

  const handleMotionToggle = (motion: string) => {
    const currentMotions = stage.gtmMotions || [];
    let newMotions: string[];

    if (currentMotions.includes(motion)) {
      newMotions = currentMotions.filter(m => m !== motion);
    } else {
      // Limit to 3 motions
      if (currentMotions.length >= 3) {
        return;
      }
      newMotions = [...currentMotions, motion];
    }

    updateStageData(projectId, stageIndex, {
      gtmMotions: newMotions
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">GTM Motions</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        You can select 2-3 as initial:
      </p>

      <div className="space-y-2">
        {gtmMotionOptions.map((motion) => (
          <label
            key={motion}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
          >
            <input
              type="checkbox"
              checked={stage.gtmMotions.includes(motion)}
              onChange={() => handleMotionToggle(motion)}
              className="w-4 h-4 text-purple-600 rounded border-gray-300 
                focus:ring-purple-500"
            />
            <span className="text-sm">{motion}</span>
          </label>
        ))}
      </div>

      {stage.gtmMotions.length > 0 && (
        <div className="mt-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-xs text-purple-700">
            Selected: {stage.gtmMotions.length}/3
          </p>
        </div>
      )}
    </div>
  );
}