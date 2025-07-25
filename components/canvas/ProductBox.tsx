'use client';

import { useProjectStore } from '@/state/projectStore';

interface ProductBoxProps {
  projectId: string;
}

export default function ProductBox({ projectId }: ProductBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateProject = useProjectStore((state) => state.updateProject);

  if (!project) return null;

  const handleFieldChange = (field: 'productDefinition' | 'problemStatement', value: string) => {
    updateProject(projectId, {
      canvasData: {
        ...project.canvasData,
        [field]: value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 text-center text-blue-600">PRODUCT</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is your product?
          </label>
          <textarea
            value={project.canvasData.productDefinition}
            onChange={(e) => handleFieldChange('productDefinition', e.target.value)}
            placeholder="Describe your product..."
            className="w-full bg-yellow-200 border-2 border-yellow-300 rounded-md p-3 
              text-gray-800 resize-none h-20 focus:outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What problem it solves?
          </label>
          <textarea
            value={project.canvasData.problemStatement}
            onChange={(e) => handleFieldChange('problemStatement', e.target.value)}
            placeholder="Describe the problem..."
            className="w-full bg-yellow-200 border-2 border-yellow-300 rounded-md p-3 
              text-gray-800 resize-none h-20 focus:outline-none focus:border-yellow-400"
          />
        </div>
      </div>
    </div>
  );
}