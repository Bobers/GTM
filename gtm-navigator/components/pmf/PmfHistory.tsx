'use client';

import { PMF_Cycle_Iteration } from '@/lib/types';
import { ChevronDown, ChevronRight, RotateCcw, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface PmfHistoryProps {
  iterations: PMF_Cycle_Iteration[];
}

export default function PmfHistory({ iterations }: PmfHistoryProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (iterations.length === 0) {
    return null;
  }

  const toggleExpanded = (iterationId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(iterationId)) {
      newExpanded.delete(iterationId);
    } else {
      newExpanded.add(iterationId);
    }
    setExpandedItems(newExpanded);
  };

  const getStatusIcon = (status: PMF_Cycle_Iteration['status']) => {
    if (status === 'archived_pivoted') {
      return <RotateCcw className="w-4 h-4 text-orange-600" />;
    }
    return <CheckCircle className="w-4 h-4 text-green-600" />;
  };

  const getStatusLabel = (status: PMF_Cycle_Iteration['status']) => {
    if (status === 'archived_pivoted') {
      return 'Pivoted';
    }
    return 'Validated';
  };

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Previous Iterations</h4>
      <div className="space-y-2">
        {iterations.map((iteration) => {
          const isExpanded = expandedItems.has(iteration.iterationId);
          
          return (
            <div
              key={iteration.iterationId}
              className="border rounded-lg bg-gray-50"
            >
              <button
                onClick={() => toggleExpanded(iteration.iterationId)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                  {getStatusIcon(iteration.status)}
                  <span className="text-sm font-medium">
                    {getStatusLabel(iteration.status)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Iteration #{iterations.indexOf(iteration) + 1}
                </span>
              </button>
              
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t">
                  <div className="pt-3">
                    <h5 className="text-xs font-semibold text-gray-600 mb-1">Hypothesis</h5>
                    <p className="text-sm text-gray-700">{iteration.productHypothesis}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-semibold text-gray-600 mb-1">Test Plan</h5>
                    <p className="text-sm text-gray-700">{iteration.testPlan}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-semibold text-gray-600 mb-1">Learnings</h5>
                    <p className="text-sm text-gray-700">{iteration.learnings}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}