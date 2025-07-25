'use client';

import { useParams } from 'next/navigation';
import { useProjectStore } from '@/state/projectStore';
import MarketTruthsBox from '@/components/canvas/MarketTruthsBox';
import ProductBox from '@/components/canvas/ProductBox';
import TargetCustomerBox from '@/components/canvas/TargetCustomerBox';
import CompetitiveAlternativesBox from '@/components/canvas/CompetitiveAlternativesBox';
import CompetitiveEdgeBox from '@/components/canvas/CompetitiveEdgeBox';
import PricingBox from '@/components/canvas/PricingBox';
import GtmObjectiveBox from '@/components/canvas/GtmObjectiveBox';

export default function CanvasPage() {
  const params = useParams();
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Strategic Canvas</h1>
        
        {/* Section 1: Market Truths */}
        <MarketTruthsBox projectId={projectId} />
        
        {/* Section 2: The Core PMF Inputs & Engine */}
        <div className="grid grid-cols-3 gap-6">
          <ProductBox projectId={projectId} />
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-center">The Product-Market Fit cycle</h3>
            <p className="text-gray-500 text-center">PMF Cycle Diagram (Coming Soon)</p>
          </div>
          <TargetCustomerBox projectId={projectId} />
        </div>
        
        {/* Section 3: The GTM Pillars */}
        <div className="grid grid-cols-3 gap-6">
          <CompetitiveAlternativesBox projectId={projectId} />
          <CompetitiveEdgeBox projectId={projectId} />
          <PricingBox projectId={projectId} />
        </div>
        
        {/* Section 4: The GTM Objective */}
        <GtmObjectiveBox projectId={projectId} />
      </div>
    </div>
  );
}