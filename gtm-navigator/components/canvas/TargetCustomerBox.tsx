'use client';

import { useProjectStore } from '@/state/projectStore';
import StickyNote from '@/components/ui/StickyNote';

interface TargetCustomerBoxProps {
  projectId: string;
}

export default function TargetCustomerBox({ projectId }: TargetCustomerBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateProject = useProjectStore((state) => state.updateProject);

  if (!project) return null;

  const handleFieldChange = (value: string) => {
    updateProject(projectId, {
      canvasData: {
        ...project.canvasData,
        targetCustomer: value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-center text-green-600">TARGET CUSTOMER</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Whom do you plan to sell to?
        </label>
        <StickyNote
          value={project.canvasData.targetCustomer}
          onChange={handleFieldChange}
          placeholder="Describe your target customer..."
        />
      </div>
    </div>
  );
}