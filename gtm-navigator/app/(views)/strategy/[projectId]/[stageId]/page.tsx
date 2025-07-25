'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProjectStore } from '@/state/projectStore';
import { ArrowLeft } from 'lucide-react';
import BeachheadStrategyBox from '@/components/strategy/BeachheadStrategyBox';
import ValidationMethodsBox from '@/components/strategy/ValidationMethodsBox';
import GtmMotionsBox from '@/components/strategy/GtmMotionsBox';
import StrategyRationaleBox from '@/components/strategy/StrategyRationaleBox';

export default function StrategyPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const stageId = parseInt(params.stageId as string);
  
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );

  if (!project || !project.stages[stageId]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Stage not found</p>
      </div>
    );
  }

  const stage = project.stages[stageId];
  const stageNames = [
    "Proof of concept",
    "Proof of monetization",
    "Proof of at least one scalable GTM motion",
    "Proof of sustainable business model",
    "Proof of market expansion"
  ];

  const handleBackToStages = () => {
    router.push(`/stages/${projectId}`);
  };

  const handleCompleteStage = () => {
    useProjectStore.getState().completeActiveStage(projectId);
    router.push(`/stages/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <button
          onClick={handleBackToStages}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stages
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Stage {stageId}: {stageNames[stageId]}</h1>
          <p className="text-gray-600">Define your strategy for this stage</p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <BeachheadStrategyBox 
            projectId={projectId} 
            stageIndex={stageId} 
          />
          <ValidationMethodsBox 
            projectId={projectId} 
            stageIndex={stageId} 
          />
          <GtmMotionsBox 
            projectId={projectId} 
            stageIndex={stageId} 
          />
        </div>

        {/* Bottom Section */}
        <StrategyRationaleBox 
          projectId={projectId} 
          stageIndex={stageId} 
        />

        {/* Complete Stage Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleCompleteStage}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Mark Stage as Complete
          </button>
        </div>
      </div>
    </div>
  );
}