'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '@/state/projectStore';

export default function Home() {
  const router = useRouter();
  const { projects, createNewProject } = useProjectStore();

  useEffect(() => {
    // Check if there's an existing project, otherwise create a new one
    let projectId: string;
    
    if (projects.length > 0) {
      projectId = projects[projects.length - 1].projectId;
    } else {
      const newProject = createNewProject();
      projectId = newProject.projectId;
    }

    // Redirect to the canvas
    router.push(`/canvas/${projectId}`);
  }, [projects, createNewProject, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">GTM Navigator</h1>
        <p className="text-gray-600">Loading your workspace...</p>
      </div>
    </div>
  );
}