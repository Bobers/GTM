'use client';

import { useProjectStore } from '@/state/projectStore';
import StickyNote from '@/components/ui/StickyNote';

interface GtmObjectiveBoxProps {
  projectId: string;
}

export default function GtmObjectiveBox({ projectId }: GtmObjectiveBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateProject = useProjectStore((state) => state.updateProject);

  if (!project) return null;

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...project.canvasData.longTermObjective];
    newObjectives[index] = value;
    
    updateProject(projectId, {
      canvasData: {
        ...project.canvasData,
        longTermObjective: newObjectives
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">Your GTM Objective in 3-6 Months</h2>
      <p className="text-sm text-gray-600 mb-4">
        What does your success look like to you?
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        {project.canvasData.longTermObjective.map((objective, index) => (
          <StickyNote
            key={index}
            value={objective}
            onChange={(value) => handleObjectiveChange(index, value)}
            placeholder={`Success metric ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}