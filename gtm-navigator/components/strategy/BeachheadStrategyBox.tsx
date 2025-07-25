'use client';

import { useProjectStore } from '@/state/projectStore';
import { Target } from 'lucide-react';

interface BeachheadStrategyBoxProps {
  projectId: string;
  stageIndex: number;
}

export default function BeachheadStrategyBox({ projectId, stageIndex }: BeachheadStrategyBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateStageData = useProjectStore((state) => state.updateStageData);

  if (!project) return null;

  const stage = project.stages[stageIndex];

  const handleStrategyChange = (value: string) => {
    updateStageData(projectId, stageIndex, {
      beachheadStrategy: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Beachhead Strategy</h3>
      </div>
      
      <div className="mb-4">
        <div className="bg-blue-50 p-4 rounded-lg text-center mb-4">
          <div className="text-3xl mb-2">🏝️</div>
          <p className="text-sm text-gray-600">
            Focus on a specific, winnable segment first
          </p>
        </div>
      </div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        Name your chosen segment:
      </label>
      <textarea
        value={stage.beachheadStrategy}
        onChange={(e) => handleStrategyChange(e.target.value)}
        placeholder="e.g., Early-stage B2B SaaS founders in the US..."
        className="w-full bg-yellow-200 border-2 border-yellow-300 rounded-md p-3 
          text-gray-800 resize-none h-24 focus:outline-none focus:border-yellow-400"
      />
    </div>
  );
}