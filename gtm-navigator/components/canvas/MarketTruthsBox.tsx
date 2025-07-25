'use client';

import { useProjectStore } from '@/state/projectStore';
import StickyNote from '@/components/ui/StickyNote';

interface MarketTruthsBoxProps {
  projectId: string;
}

export default function MarketTruthsBox({ projectId }: MarketTruthsBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateProject = useProjectStore((state) => state.updateProject);

  if (!project) return null;

  const handleTruthChange = (index: number, value: string) => {
    const newMarketTruths = [...project.canvasData.marketTruths];
    newMarketTruths[index] = value;
    
    updateProject(projectId, {
      canvasData: {
        ...project.canvasData,
        marketTruths: newMarketTruths
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Here is what we know to be true about our target market:
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {project.canvasData.marketTruths.map((truth, index) => (
          <StickyNote
            key={index}
            value={truth}
            onChange={(value) => handleTruthChange(index, value)}
            placeholder={`Market Truth ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}