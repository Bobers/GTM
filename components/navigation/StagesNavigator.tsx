'use client';

import { useRouter } from 'next/navigation';
import { Check, Lock, Play } from 'lucide-react';
import { GTM_Stage_Data } from '@/lib/types';

interface StagesNavigatorProps {
  stages: GTM_Stage_Data[];
  projectId: string;
}

const stageInfo = [
  {
    title: "Proof of concept",
    goal: "How will you get the first [x] testers / free users to test the product?"
  },
  {
    title: "Proof of monetization",
    goal: "How will you get your first [x] customers?"
  },
  {
    title: "Proof of at least one scalable GTM motion",
    goal: "How will you get more customers predictably?"
  },
  {
    title: "Proof of sustainable business model",
    goal: "What needs to happen for you to be break-even/profitable?"
  },
  {
    title: "Proof of market expansion",
    goal: "Which markets do you plan to win next?"
  }
];

export default function StagesNavigator({ stages, projectId }: StagesNavigatorProps) {
  const router = useRouter();

  const handleStageClick = (stageIndex: number) => {
    const stage = stages[stageIndex];
    if (stage.status === 'active') {
      router.push(`/strategy/${projectId}/${stageIndex}`);
    }
  };

  const getStageIcon = (status: 'locked' | 'active' | 'complete') => {
    switch (status) {
      case 'complete':
        return <Check className="w-6 h-6 text-green-600" />;
      case 'active':
        return <Play className="w-6 h-6 text-blue-600" />;
      case 'locked':
        return <Lock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStageStyles = (status: 'locked' | 'active' | 'complete') => {
    switch (status) {
      case 'complete':
        return 'bg-green-50 border-green-300 cursor-not-allowed';
      case 'active':
        return 'bg-blue-50 border-blue-300 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all';
      case 'locked':
        return 'bg-gray-50 border-gray-300 cursor-not-allowed opacity-60';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Stages of Your Go-to-Market Strategy</h1>
        <p className="text-gray-600">Progress through each stage to build your complete GTM strategy</p>
      </div>

      <div className="relative">
        {/* Progress line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2 hidden lg:block" />
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 relative">
          {stages.map((stage, index) => (
            <div
              key={index}
              onClick={() => handleStageClick(index)}
              className={`
                relative bg-white rounded-lg border-2 p-6 
                ${getStageStyles(stage.status)}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-500">Stage {index}</span>
                {getStageIcon(stage.status)}
              </div>
              
              <h3 className="text-lg font-semibold mb-2">
                {stageInfo[index].title}
              </h3>
              
              <p className="text-sm text-gray-600">
                {stageInfo[index].goal}
              </p>

              {stage.status === 'active' && (
                <div className="mt-4 text-center">
                  <span className="text-blue-600 font-medium text-sm">
                    Click to continue →
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}