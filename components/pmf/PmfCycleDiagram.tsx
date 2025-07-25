'use client';

import { useState } from 'react';
import { Lightbulb, TestTube, TrendingUp, RotateCcw } from 'lucide-react';

interface PmfCycleDiagramProps {
  onStageClick: (stage: 'hypothesis' | 'test' | 'analyze' | 'decision') => void;
  currentStage?: 'hypothesis' | 'test' | 'analyze' | 'decision';
}

export default function PmfCycleDiagram({ onStageClick, currentStage }: PmfCycleDiagramProps) {
  const [hoveredStage, setHoveredStage] = useState<string | null>(null);

  const stages = [
    { id: 'hypothesis', label: 'Hypothesis', icon: Lightbulb, color: 'blue', position: { x: 200, y: 50 } },
    { id: 'test', label: 'Test', icon: TestTube, color: 'green', position: { x: 350, y: 200 } },
    { id: 'analyze', label: 'Analyze', icon: TrendingUp, color: 'purple', position: { x: 200, y: 350 } },
    { id: 'decision', label: 'Decision', icon: RotateCcw, color: 'orange', position: { x: 50, y: 200 } }
  ];

  const getStageColor = (stageId: string, colorName: string) => {
    const isActive = currentStage === stageId;
    const isHovered = hoveredStage === stageId;
    
    const colors = {
      blue: {
        bg: isActive ? 'fill-blue-500' : isHovered ? 'fill-blue-400' : 'fill-blue-300',
        border: 'stroke-blue-600',
        text: 'text-blue-600'
      },
      green: {
        bg: isActive ? 'fill-green-500' : isHovered ? 'fill-green-400' : 'fill-green-300',
        border: 'stroke-green-600',
        text: 'text-green-600'
      },
      purple: {
        bg: isActive ? 'fill-purple-500' : isHovered ? 'fill-purple-400' : 'fill-purple-300',
        border: 'stroke-purple-600',
        text: 'text-purple-600'
      },
      orange: {
        bg: isActive ? 'fill-orange-500' : isHovered ? 'fill-orange-400' : 'fill-orange-300',
        border: 'stroke-orange-600',
        text: 'text-orange-600'
      }
    };
    
    return colors[colorName as keyof typeof colors];
  };

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <svg width="400" height="400" viewBox="0 0 400 400" className="w-full h-full max-w-md">
        {/* Arrows */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
        </defs>
        
        {/* Curved arrows between stages */}
        <path
          d="M 250 100 Q 325 125, 300 150"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 300 250 Q 275 325, 250 300"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 150 300 Q 75 275, 100 250"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 100 150 Q 125 75, 150 100"
          fill="none"
          stroke="#666"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        {/* Center text */}
        <text x="200" y="200" textAnchor="middle" className="fill-gray-600 text-sm font-semibold">
          PMF Cycle
        </text>

        {/* Stage nodes */}
        {stages.map((stage) => {
          const colors = getStageColor(stage.id, stage.color);
          const Icon = stage.icon;
          
          return (
            <g
              key={stage.id}
              transform={`translate(${stage.position.x}, ${stage.position.y})`}
              onClick={() => onStageClick(stage.id as 'hypothesis' | 'test' | 'analyze' | 'decision')}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              className="cursor-pointer"
            >
              <circle
                r="45"
                className={`${colors.bg} ${colors.border} stroke-2 transition-all duration-200`}
              />
              <foreignObject x="-30" y="-30" width="60" height="60">
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <Icon className={`w-6 h-6 ${colors.text} mb-1`} />
                  <span className={`text-xs font-medium ${colors.text}`}>
                    {stage.label}
                  </span>
                </div>
              </foreignObject>
              {currentStage === stage.id && (
                <circle
                  r="50"
                  fill="none"
                  stroke={colors.border.replace('stroke-', '')}
                  strokeWidth="3"
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}