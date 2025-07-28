'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Unlock, RefreshCw, Shuffle, Save, ChevronRight, ChevronLeft, Info, CheckCircle } from 'lucide-react';

const GTMSlotMachine = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [lockedSlots, setLockedSlots] = useState<Record<string, boolean>>({});
  const [completedSections, setCompletedSections] = useState<Record<string, boolean>>({});
  const [slots, setSlots] = useState({
    // Phase 1: Foundation & Research (3-6 months)
    // Market Analysis
    tam: "$50B total market",
    sam: "$5B serviceable market", 
    som: "$250M obtainable market",
    marketGrowth: "23% CAGR",
    
    // Customer Definition  
    primaryPersona: "VP of Operations",
    personaCompany: "$10-50M revenue",
    jobToBeDone: "Reduce inventory costs",
    willingnessToPay: "$500-2000/month",
    
    // Competitive Analysis
    directCompetitor: "TradeGecko",
    indirectCompetitor: "Excel spreadsheets", 
    competitiveAdvantage: "10x faster implementation",
    marketPosition: "Disruptor in mid-market",
    
    // Phase 2: Strategy Development (4-6 weeks)
    // Value Proposition
    coreValue: "90% reduction in stockouts",
    uniqueDifferentiator: "AI demand forecasting",
    
    // Pricing Strategy
    pricingModel: "Usage-based pricing",
    valueMetric: "Per SKU managed",
    pricePoint: "$0.50 per SKU/month",
    
    // Sales Model
    salesModel: "Product-led sales",
    salesCycle: "30-day trial to paid",
    dealSize: "$15K ACV",
    
    // Marketing Strategy
    primaryChannel: "Content + SEO",
    secondaryChannel: "Partner integrations",
    customerAcquisition: "Freemium funnel",
    
    // Phase 3: Execution Planning (4-6 weeks)
    // Sales Enablement
    salesPlaybook: "Challenger sale method",
    demoApproach: "Value-first demo",
    objectionHandling: "ROI calculator ready",
    
    // Marketing Execution
    contentStrategy: "Problem-aware content",
    leadMagnet: "Inventory audit template",
    nurtureCampaign: "14-day email series",
    
    // Tech Stack
    crmChoice: "HubSpot CRM",
    marketingAutomation: "ActiveCampaign",
    analyticsStack: "Segment + Mixpanel",
    
    // Team Alignment
    revOpsStructure: "Unified revenue team",
    handoffProcess: "MQL to SQL scoring",
    sharedMetrics: "Pipeline velocity",
    
    // Phase 4: Launch & Optimization (4-12 weeks)
    // Launch Strategy
    launchApproach: "Rolling regional launch",
    betaProgram: "50 design partners",
    launchTiming: "Q2 2025 start",
    
    // Success Metrics
    northStarMetric: "Weekly active accounts",
    leadingIndicator: "Trial-to-paid rate",
    laggingIndicator: "$1M ARR milestone",
    
    // Optimization Plan
    testingPriority: "Onboarding flow A/B",
    feedbackLoop: "Monthly NPS surveys",
    iterationCycle: "2-week sprints"
  });

  // GTM phases based on the report
  const phases = [
    {
      name: "Foundation & Research",
      duration: "3-6 months",
      sections: [
        {
          name: "Market Analysis",
          slots: ["tam", "sam", "som", "marketGrowth"],
          info: "Calculate TAM/SAM/SOM using bottom-up approach with real customer data"
        },
        {
          name: "Customer Definition", 
          slots: ["primaryPersona", "personaCompany", "jobToBeDone", "willingnessToPay"],
          info: "Combine personas with Jobs-to-Be-Done framework for complete understanding"
        },
        {
          name: "Competitive Analysis",
          slots: ["directCompetitor", "indirectCompetitor", "competitiveAdvantage", "marketPosition"],
          info: "Understand direct, indirect, and status quo alternatives"
        }
      ]
    },
    {
      name: "Strategy Development",
      duration: "4-6 weeks",
      sections: [
        {
          name: "Value Proposition",
          slots: ["coreValue", "uniqueDifferentiator"],
          info: "Must be tested with real customers before proceeding"
        },
        {
          name: "Pricing Strategy",
          slots: ["pricingModel", "valueMetric", "pricePoint"],
          info: "Pricing influences all subsequent decisions - must come first"
        },
        {
          name: "Sales Model",
          slots: ["salesModel", "salesCycle", "dealSize"],
          info: "Choose based on complexity and price point"
        },
        {
          name: "Marketing Strategy",
          slots: ["primaryChannel", "secondaryChannel", "customerAcquisition"],
          info: "Align channels with sales model and buyer journey"
        }
      ]
    },
    {
      name: "Execution Planning", 
      duration: "4-6 weeks",
      sections: [
        {
          name: "Sales Enablement",
          slots: ["salesPlaybook", "demoApproach", "objectionHandling"],
          info: "Dynamic playbooks are 48% more effective than static ones"
        },
        {
          name: "Marketing Execution",
          slots: ["contentStrategy", "leadMagnet", "nurtureCampaign"],
          info: "Content must align with each stage of buyer journey"
        },
        {
          name: "Tech Stack",
          slots: ["crmChoice", "marketingAutomation", "analyticsStack"],
          info: "Seamless integration enables closed-loop reporting"
        },
        {
          name: "Team Alignment",
          slots: ["revOpsStructure", "handoffProcess", "sharedMetrics"],
          info: "Aligned teams see 19% faster growth"
        }
      ]
    },
    {
      name: "Launch & Optimization",
      duration: "4-12 weeks",
      sections: [
        {
          name: "Launch Strategy",
          slots: ["launchApproach", "betaProgram", "launchTiming"],
          info: "Modern launches use rolling thunder vs big bang"
        },
        {
          name: "Success Metrics",
          slots: ["northStarMetric", "leadingIndicator", "laggingIndicator"],
          info: "Track both predictive and outcome metrics"
        },
        {
          name: "Optimization Plan",
          slots: ["testingPriority", "feedbackLoop", "iterationCycle"],
          info: "Continuous improvement through systematic testing"
        }
      ]
    }
  ];

  // Extensive variations for each slot
  const variations: Record<string, string[]> = {
    // Market Analysis
    tam: ["$50B total market", "$100B global market", "$25B regional market", "$10B niche market", "$200B category market"],
    sam: ["$5B serviceable market", "$10B addressable market", "$2B target segment", "$500M focused market", "$1B expansion market"],
    som: ["$250M obtainable market", "$100M year 1 target", "$500M 3-year goal", "$50M initial market", "$1B aggressive target"],
    marketGrowth: ["23% CAGR", "15% annual growth", "35% hypergrowth", "8% steady growth", "50% emerging market"],
    
    // Customer Definition
    primaryPersona: ["VP of Operations", "Supply Chain Director", "Inventory Manager", "COO", "Warehouse Manager", "Procurement Lead"],
    personaCompany: ["$10-50M revenue", "50-200 employees", "Multi-location retail", "E-commerce pure play", "B2B distributor", "DTC brand"],
    jobToBeDone: ["Reduce inventory costs", "Prevent stockouts", "Optimize cash flow", "Scale operations", "Automate processes", "Improve accuracy"],
    willingnessToPay: ["$500-2000/month", "$100-500/month", "$2000-5000/month", "$50-200/month", "$5000+/month enterprise"],
    
    // Competitive Analysis
    directCompetitor: ["TradeGecko", "Zoho Inventory", "NetSuite", "Cin7", "Fishbowl", "InFlow"],
    indirectCompetitor: ["Excel spreadsheets", "QuickBooks", "Manual processes", "ERP systems", "Custom solutions", "Paper tracking"],
    competitiveAdvantage: ["10x faster implementation", "50% lower cost", "AI nobody else has", "Best integrations", "Mobile-first design", "Superior support"],
    marketPosition: ["Disruptor in mid-market", "Premium enterprise solution", "SMB specialist", "Vertical leader", "Price leader", "Innovation leader"],
    
    // Value Proposition
    coreValue: ["90% reduction in stockouts", "50% less time on inventory", "30% cost reduction", "2x inventory turns", "Zero implementation time", "100% accuracy guarantee"],
    uniqueDifferentiator: ["AI demand forecasting", "One-click setup", "Predictive analytics", "Real-time sync", "No training required", "White glove service"],
    
    // Pricing Strategy  
    pricingModel: ["Usage-based pricing", "Tiered SaaS pricing", "Flat monthly rate", "Freemium model", "Per-seat pricing", "Transaction-based"],
    valueMetric: ["Per SKU managed", "Per order processed", "Per warehouse", "Per user", "Revenue percentage", "Per integration"],
    pricePoint: ["$0.50 per SKU/month", "$99/user/month", "$499 flat rate", "1% of GMV", "$29 starter plan", "$2000 enterprise"],
    
    // Sales Model
    salesModel: ["Product-led sales", "Inside sales team", "Channel partners", "Self-service only", "Field sales", "Hybrid PLG+Sales"],
    salesCycle: ["30-day trial to paid", "14-day sales cycle", "3-month enterprise", "Instant activation", "6-week evaluation", "Annual contracts"],
    dealSize: ["$15K ACV", "$5K ACV", "$50K ACV", "$1K ACV", "$100K+ enterprise", "$500 starter deals"],
    
    // Marketing Strategy
    primaryChannel: ["Content + SEO", "Paid social ads", "Partner channel", "Outbound sales", "Product virality", "Events + webinars"],
    secondaryChannel: ["Partner integrations", "Affiliate program", "Email marketing", "Community building", "Influencer marketing", "PR + media"],
    customerAcquisition: ["Freemium funnel", "Demo requests", "Free trial", "Pilot programs", "Land and expand", "Account-based marketing"],
    
    // Sales Enablement
    salesPlaybook: ["Challenger sale method", "Solution selling", "SPIN selling", "Consultative approach", "Value selling", "MEDDIC process"],
    demoApproach: ["Value-first demo", "Day-in-life demo", "Sandbox trial", "Proof of concept", "Custom demo", "Group workshops"],
    objectionHandling: ["ROI calculator ready", "Case study library", "Reference calls", "Risk reversal offer", "Competitor comparison", "Security docs ready"],
    
    // Marketing Execution
    contentStrategy: ["Problem-aware content", "SEO pillar pages", "Industry reports", "Customer stories", "Educational series", "Thought leadership"],
    leadMagnet: ["Inventory audit template", "ROI calculator", "Industry benchmark report", "Free mini-course", "Strategy guide", "Assessment tool"],
    nurtureCampaign: ["14-day email series", "Behavioral triggers", "Lifecycle stages", "Persona-based flows", "Re-engagement series", "Onboarding sequence"],
    
    // Tech Stack
    crmChoice: ["HubSpot CRM", "Salesforce", "Pipedrive", "Monday.com", "Copper CRM", "Microsoft Dynamics"],
    marketingAutomation: ["ActiveCampaign", "Marketo", "Pardot", "Mailchimp", "Drip", "Customer.io"],
    analyticsStack: ["Segment + Mixpanel", "Google Analytics 4", "Amplitude", "Heap Analytics", "Pendo", "FullStory"],
    
    // Team Alignment
    revOpsStructure: ["Unified revenue team", "Separate sales/marketing", "Pod structure", "Geographic teams", "Product-aligned teams", "Customer segment teams"],
    handoffProcess: ["MQL to SQL scoring", "Account-based routing", "Round-robin assignment", "Territory management", "Skill-based routing", "Automated workflows"],
    sharedMetrics: ["Pipeline velocity", "Revenue per lead", "Customer lifetime value", "Win rate", "Time to close", "Expansion revenue"],
    
    // Launch Strategy
    launchApproach: ["Rolling regional launch", "Big bang launch", "Soft launch beta", "Phased by segment", "Partner channel first", "Product hunt launch"],
    betaProgram: ["50 design partners", "100 beta users", "Private preview", "Early access list", "Founder-led sales", "Waitlist strategy"],
    launchTiming: ["Q2 2025 start", "Immediate launch", "After funding round", "Holiday season", "Industry conference", "Feature complete"],
    
    // Success Metrics
    northStarMetric: ["Weekly active accounts", "Monthly recurring revenue", "Net revenue retention", "Product qualified leads", "Customer health score", "Feature adoption rate"],
    leadingIndicator: ["Trial-to-paid rate", "Activation rate", "Time to value", "Engagement score", "Support ticket volume", "Referral rate"],
    laggingIndicator: ["$1M ARR milestone", "1000 customers", "120% NRR", "3:1 LTV:CAC", "Break-even point", "Market share %"],
    
    // Optimization Plan
    testingPriority: ["Onboarding flow A/B", "Pricing page tests", "Email subject lines", "Landing page CRO", "In-app messaging", "Sales pitch variations"],
    feedbackLoop: ["Monthly NPS surveys", "Quarterly interviews", "In-app feedback", "Churn interviews", "Win/loss analysis", "Customer advisory board"],
    iterationCycle: ["2-week sprints", "Monthly reviews", "Quarterly planning", "Continuous deployment", "Weekly experiments", "Daily standups"]
  };

  const rollSlot = (slotKey: string) => {
    if (lockedSlots[slotKey]) return;
    
    const options = variations[slotKey];
    const currentValue = slots[slotKey as keyof typeof slots];
    const currentIndex = options.indexOf(currentValue);
    const newIndex = (currentIndex + 1) % options.length;
    
    setSlots({
      ...slots,
      [slotKey]: options[newIndex]
    });
  };

  const toggleLock = (slotKey: string) => {
    setLockedSlots({
      ...lockedSlots,
      [slotKey]: !lockedSlots[slotKey]
    });
  };

  const rollSection = () => {
    const currentSectionData = phases[currentPhase].sections[currentSection];
    currentSectionData.slots.forEach(slot => {
      if (!lockedSlots[slot]) {
        rollSlot(slot);
      }
    });
  };

  const markSectionComplete = () => {
    const sectionKey = `${currentPhase}-${currentSection}`;
    setCompletedSections({
      ...completedSections,
      [sectionKey]: true
    });
  };

  const isSectionComplete = (phaseIdx: number, sectionIdx: number) => {
    return completedSections[`${phaseIdx}-${sectionIdx}`] || false;
  };

  const saveStrategy = () => {
    const strategy = {
      timestamp: new Date().toISOString(),
      slots: { ...slots },
      locked: { ...lockedSlots },
      completed: { ...completedSections }
    };
    console.log('Saved GTM strategy:', strategy);
    alert('GTM Strategy saved! Check console for full details.');
  };

  const renderVerticalSlot = (slotKey: string) => {
    const isLocked = lockedSlots[slotKey];
    const slotValue = slots[slotKey as keyof typeof slots];
    
    return (
      <div key={slotKey} className="relative">
        {/* Slot machine window */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700 relative h-24">
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
          
          <div className="h-full flex items-center justify-center px-3 py-2">
            <div className={`text-center ${isLocked ? 'text-yellow-400' : 'text-white'} text-sm leading-tight`}>
              {slotValue}
            </div>
          </div>
        </div>
        
        {/* Slot label */}
        <div className="text-xs text-gray-400 mt-1 text-center">
          {slotKey.replace(/([A-Z])/g, ' $1').trim()}
        </div>
        
        {/* Controls */}
        <div className="flex gap-1 mt-2">
          <button
            onClick={() => toggleLock(slotKey)}
            className={`flex-1 p-1.5 rounded text-sm ${
              isLocked 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } transition-colors`}
          >
            {isLocked ? <Lock size={12} className="mx-auto" /> : <Unlock size={12} className="mx-auto" />}
          </button>
          <button
            onClick={() => rollSlot(slotKey)}
            disabled={isLocked}
            className={`flex-1 p-1.5 rounded text-sm ${
              isLocked 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } transition-colors`}
          >
            <RefreshCw size={12} className="mx-auto" />
          </button>
        </div>
      </div>
    );
  };

  const currentPhaseData = phases[currentPhase];
  const currentSectionData = currentPhaseData.sections[currentSection];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            GTM Strategy Builder
          </h1>
          <p className="text-gray-400 text-xs">Build your complete Go-To-Market strategy phase by phase</p>
        </div>

        {/* Phase Progress */}
        <div className="bg-gray-800 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-300">GTM Development Timeline</h3>
            <span className="text-xs text-gray-400">Total: 3-9 months</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {phases.map((phase, idx) => (
              <div 
                key={idx}
                className={`text-center p-2 rounded cursor-pointer transition-all ${
                  idx === currentPhase 
                    ? 'bg-purple-600 ring-2 ring-purple-400' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => {
                  setCurrentPhase(idx);
                  setCurrentSection(0);
                }}
              >
                <div className="text-xs font-medium">{phase.name}</div>
                <div className="text-xs text-gray-400 mt-1">{phase.duration}</div>
                <div className="text-xs text-gray-400">
                  {phase.sections.filter((s, sIdx) => isSectionComplete(idx, sIdx)).length}/{phase.sections.length} done
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Phase & Section */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-2xl mb-4">
          {/* Section Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="p-1.5 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
            >
              <ChevronLeft size={16} />
            </button>
            
            <div className="text-center flex-1">
              <div className="text-xs text-gray-400">
                Phase {currentPhase + 1} • Section {currentSection + 1} of {currentPhaseData.sections.length}
              </div>
              <div className="font-semibold flex items-center justify-center gap-2">
                {currentSectionData.name}
                {isSectionComplete(currentPhase, currentSection) && (
                  <CheckCircle size={16} className="text-green-500" />
                )}
              </div>
            </div>
            
            <button
              onClick={() => setCurrentSection(Math.min(currentPhaseData.sections.length - 1, currentSection + 1))}
              disabled={currentSection === currentPhaseData.sections.length - 1}
              className="p-1.5 bg-gray-700 rounded disabled:opacity-50 hover:bg-gray-600"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Section Info */}
          <div className="bg-gray-900 rounded p-2 mb-4 text-xs text-gray-400 flex items-start gap-2">
            <Info size={14} className="flex-shrink-0 mt-0.5" />
            <span>{currentSectionData.info}</span>
          </div>

          {/* Slots Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {currentSectionData.slots.map(slot => renderVerticalSlot(slot))}
          </div>
          
          {/* Section Controls */}
          <div className="flex gap-2 mt-4 justify-center">
            <button
              onClick={rollSection}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2 text-sm"
            >
              <Shuffle size={16} />
              Roll Section
            </button>
            <button
              onClick={markSectionComplete}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
                isSectionComplete(currentPhase, currentSection)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <CheckCircle size={16} />
              Mark Complete
            </button>
            <button
              onClick={saveStrategy}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 text-sm"
            >
              <Save size={16} />
              Save Progress
            </button>
          </div>
        </div>

        {/* Section Overview */}
        <div className="bg-gray-800 rounded-lg p-3 mb-3">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Current Phase Sections</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {currentPhaseData.sections.map((section, idx) => (
              <div 
                key={idx}
                className={`text-center p-2 rounded cursor-pointer transition-all text-xs ${
                  idx === currentSection 
                    ? 'bg-purple-600' 
                    : isSectionComplete(currentPhase, idx)
                    ? 'bg-green-700 hover:bg-green-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setCurrentSection(idx)}
              >
                <div className="flex items-center justify-center gap-1">
                  {section.name}
                  {isSectionComplete(currentPhase, idx) && <CheckCircle size={12} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Strategy Summary */}
        <div className="bg-gray-800 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Strategy Summary</h3>
          <div className="text-xs space-y-1 text-gray-400">
            <div><span className="text-gray-300">Market:</span> {slots.tam} → {slots.sam} → {slots.som}</div>
            <div><span className="text-gray-300">Target:</span> {slots.primaryPersona} at {slots.personaCompany}</div>
            <div><span className="text-gray-300">Value:</span> {slots.coreValue} via {slots.uniqueDifferentiator}</div>
            <div><span className="text-gray-300">Model:</span> {slots.salesModel} with {slots.pricingModel}</div>
            <div><span className="text-gray-300">Launch:</span> {slots.launchApproach} targeting {slots.northStarMetric}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GTMSlotMachine;