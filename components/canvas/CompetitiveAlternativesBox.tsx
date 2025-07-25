'use client';

import { useProjectStore } from '@/state/projectStore';

interface CompetitiveAlternativesBoxProps {
  projectId: string;
}

export default function CompetitiveAlternativesBox({ projectId }: CompetitiveAlternativesBoxProps) {
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );
  const updateProject = useProjectStore((state) => state.updateProject);

  if (!project) return null;

  const handleFieldChange = (value: string) => {
    updateProject(projectId, {
      canvasData: {
        ...project.canvasData,
        competitiveAlternatives: value
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-2">Competitive Alternatives</h3>
      <p className="text-sm text-gray-600 mb-4">
        How are customers currently solving this problem?
      </p>
      
      <textarea
        value={project.canvasData.competitiveAlternatives}
        onChange={(e) => handleFieldChange(e.target.value)}
        placeholder="Describe current alternatives..."
        className="w-full bg-yellow-200 border-2 border-yellow-300 rounded-md p-3 
          text-gray-800 resize-none h-32 focus:outline-none focus:border-yellow-400"
      />
    </div>
  );
}