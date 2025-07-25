'use client';

import { useState } from 'react';
import { useProjectStore } from '@/state/projectStore';
import PmfCycleDiagram from './PmfCycleDiagram';
import PmfCycleStageModal from '@/components/modals/PmfCycleStageModal';
import PmfHistory from './PmfHistory';
import { v4 as uuidv4 } from 'uuid';
import { PMF_Cycle_Iteration } from '@/lib/types';

interface PmfCycleContainerProps {
  projectId: string;
  stageIndex: number;
}

export default function PmfCycleContainer({ projectId, stageIndex }: PmfCycleContainerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModalStage, setCurrentModalStage] = useState<'hypothesis' | 'test' | 'analyze' | 'decision'>('hypothesis');
  
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateStageData = useProjectStore((state) => state.updateStageData);

  if (!project) return null;

  const stage = project.stages[stageIndex];
  const currentIteration = stage.pmfCycleLog.find(i => i.status === 'active');

  const handleStageClick = (clickedStage: 'hypothesis' | 'test' | 'analyze' | 'decision') => {
    setCurrentModalStage(clickedStage);
    setModalOpen(true);
  };

  const handleSaveStageData = (data: Partial<PMF_Cycle_Iteration>) => {
    let updatedIteration: PMF_Cycle_Iteration;
    
    if (currentIteration) {
      updatedIteration = { ...currentIteration, ...data };
    } else {
      updatedIteration = {
        iterationId: uuidv4(),
        status: 'active',
        productHypothesis: '',
        testPlan: '',
        learnings: '',
        ...data
      };
    }

    const updatedLog = currentIteration
      ? stage.pmfCycleLog.map(i => i.iterationId === currentIteration.iterationId ? updatedIteration : i)
      : [...stage.pmfCycleLog, updatedIteration];

    updateStageData(projectId, stageIndex, { pmfCycleLog: updatedLog });
  };

  const handleDecision = (decision: 'pivot' | 'validate') => {
    if (!currentIteration) return;

    const archivedIteration: PMF_Cycle_Iteration = {
      ...currentIteration,
      status: decision === 'pivot' ? 'archived_pivoted' : 'archived_validated'
    };

    const newIteration: PMF_Cycle_Iteration = {
      iterationId: uuidv4(),
      status: 'active',
      productHypothesis: decision === 'pivot' ? '' : currentIteration.productHypothesis,
      testPlan: '',
      learnings: ''
    };

    const updatedLog = stage.pmfCycleLog
      .map(i => i.iterationId === currentIteration.iterationId ? archivedIteration : i)
      .concat(newIteration);

    updateStageData(projectId, stageIndex, { pmfCycleLog: updatedLog });
  };

  const getCurrentStage = (): 'hypothesis' | 'test' | 'analyze' | 'decision' | undefined => {
    if (!currentIteration) return 'hypothesis';
    
    if (!currentIteration.productHypothesis) return 'hypothesis';
    if (!currentIteration.testPlan) return 'test';
    if (!currentIteration.learnings) return 'analyze';
    return 'decision';
  };

  return (
    <div className="space-y-4">
      <PmfCycleDiagram 
        onStageClick={handleStageClick}
        currentStage={getCurrentStage()}
      />
      
      <PmfHistory 
        iterations={stage.pmfCycleLog.filter(i => i.status !== 'active')}
      />

      <PmfCycleStageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        stage={currentModalStage}
        currentIteration={currentIteration}
        onSave={handleSaveStageData}
        onDecision={handleDecision}
      />
    </div>
  );
}