'use client';

import { useParams, useRouter } from 'next/navigation';
import { useProjectStore } from '@/state/projectStore';
import StagesNavigator from '@/components/navigation/StagesNavigator';
import { ArrowLeft } from 'lucide-react';

export default function StagesPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const project = useProjectStore((state) => 
    state.projects.find(p => p.projectId === projectId)
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  const handleBackToCanvas = () => {
    router.push(`/canvas/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <button
          onClick={handleBackToCanvas}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Strategic Canvas
        </button>

        {/* Stages Navigator */}
        <StagesNavigator 
          stages={project.stages} 
          projectId={projectId}
        />
      </div>
    </div>
  );
}