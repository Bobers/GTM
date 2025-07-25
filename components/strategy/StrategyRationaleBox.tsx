'use client';

import { useProjectStore } from '@/state/projectStore';
import StickyNote from '@/components/ui/StickyNote';
import { BarChart3 } from 'lucide-react';

interface StrategyRationaleBoxProps {
  projectId: string;
  stageIndex: number;
}

export default function StrategyRationaleBox({ projectId, stageIndex }: StrategyRationaleBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateStageData = useProjectStore((state) => state.updateStageData);

  if (!project) return null;

  const stage = project.stages[stageIndex];

  const handleRationaleChange = (index: number, value: string) => {
    const newRationale = [...stage.rationale];
    newRationale[index] = value;
    
    updateStageData(projectId, stageIndex, {
      rationale: newRationale
    });
  };

  const handleKpiChange = (index: number, value: string) => {
    const newKpis = [...stage.kpis];
    newKpis[index] = value;
    
    updateStageData(projectId, stageIndex, {
      kpis: newKpis
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rationale Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Why we think these things will work?
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {stage.rationale.map((reason, index) => (
              <StickyNote
                key={index}
                value={reason}
                onChange={(value) => handleRationaleChange(index, value)}
                placeholder={`Reason ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* KPIs Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold">Growth motions KPIs:</h3>
          </div>
          <div className="space-y-4">
            {stage.kpis.map((kpi, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KPI {index + 1}
                </label>
                <input
                  type="text"
                  value={kpi}
                  onChange={(e) => handleKpiChange(index, e.target.value)}
                  placeholder={`e.g., 100 qualified leads per month`}
                  className="w-full border-2 border-gray-300 rounded-md p-3 
                    text-gray-800 focus:outline-none focus:border-indigo-400"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}