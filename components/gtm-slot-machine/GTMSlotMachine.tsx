'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, Unlock, RefreshCw, Shuffle, Save, ChevronRight, ChevronLeft } from 'lucide-react';

const GTMSlotMachine = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [activeSubSection, setActiveSubSection] = useState(null);
  const [lockedSlots, setLockedSlots] = useState<Record<string, boolean>>({});
  const [slots, setSlots] = useState({
    // Customer & Market
    targetPersona: "Small business owners",
    industry: "E-commerce retail",
    companySize: "10-50 employees",
    painPoint: "Inventory management chaos",
    
    // Product & Value
    coreSolution: "AI-powered inventory platform",
    uniqueValue: "90% faster than manual tracking",
    pricing: "Freemium with $99/mo pro tier",
    
    // Go-to-Market
    channel1: "Content marketing & SEO",
    channel2: "Partner integrations",
    salesMotion: "Product-led growth",
    
    // Success Metrics
    northStar: "Monthly active users",
    revenue: "$1M ARR in 12 months",
    adoption: "1000 customers in 6 months",
    
    // Competitive Position
    competitor: "Versus spreadsheets & Zoho",
    differentiator: "10x easier setup"
  });

  // Organized sections for GTM
  const sections = [
    {
      name: "Customer & Market",
      slots: ["targetPersona", "industry", "companySize", "painPoint"]
    },
    {
      name: "Product & Value", 
      slots: ["coreSolution", "uniqueValue", "pricing"]
    },
    {
      name: "Go-to-Market",
      slots: ["channel1", "channel2", "salesMotion"]
    },
    {
      name: "Success Metrics",
      slots: ["northStar", "revenue", "adoption"]
    },
    {
      name: "Competition",
      slots: ["competitor", "differentiator"]
    }
  ];

  // Sample variations for each slot
  const variations: Record<string, string[]> = {
    targetPersona: [
      "Small business owners",
      "E-commerce entrepreneurs", 
      "Retail store managers",
      "Operations directors",
      "Supply chain managers"
    ],
    industry: [
      "E-commerce retail",
      "Fashion & apparel",
      "Consumer electronics",
      "Health & beauty",
      "Food & beverage"
    ],
    companySize: [
      "10-50 employees",
      "Solo entrepreneurs",
      "51-200 employees", 
      "201-500 employees",
      "Micro businesses <10"
    ],
    painPoint: [
      "Inventory management chaos",
      "Stockouts losing sales",
      "Dead stock eating profits",
      "No demand forecasting",
      "Manual counting nightmares"
    ],
    coreSolution: [
      "AI-powered inventory platform",
      "Real-time tracking dashboard",
      "Predictive analytics suite",
      "Multi-channel sync tool",
      "Smart reorder system"
    ],
    uniqueValue: [
      "90% faster than manual tracking",
      "Zero learning curve",
      "Saves 10 hours per week",
      "ROI in 30 days",
      "No IT team required"
    ],
    pricing: [
      "Freemium with $99/mo pro tier",
      "$49/mo flat rate",
      "Usage-based from $19/mo",
      "$199/mo all-inclusive",
      "Free trial then $79/mo"
    ],
    channel1: [
      "Content marketing & SEO",
      "Paid social media ads",
      "Influencer partnerships",
      "Direct outbound sales",
      "Webinars & demos"
    ],
    channel2: [
      "Partner integrations",
      "Affiliate program",
      "Trade shows & events",
      "Email marketing",
      "Community building"
    ],
    salesMotion: [
      "Product-led growth",
      "Sales-led enterprise",
      "Channel partnerships",
      "Hybrid PLG + sales",
      "Self-serve only"
    ],
    northStar: [
      "Monthly active users",
      "Revenue per customer",
      "Net revenue retention",
      "Time to value",
      "Feature adoption rate"
    ],
    revenue: [
      "$1M ARR in 12 months",
      "$500k in 6 months",
      "$2M ARR in 18 months",
      "$100k MRR by month 9",
      "Break-even in 8 months"
    ],
    adoption: [
      "1000 customers in 6 months",
      "100 enterprise deals Y1",
      "50k free users in 1 year",
      "500 paying customers Y1",
      "10% market share in 2 years"
    ],
    competitor: [
      "Versus spreadsheets & Zoho",
      "Against Shopify native",
      "Competing with TradeGecko",
      "Better than QuickBooks",
      "Disrupting legacy ERPs"
    ],
    differentiator: [
      "10x easier setup",
      "Half the price",
      "Mobile-first design", 
      "AI nobody else has",
      "Best customer support"
    ],
    // Sub-level breakdowns
    persona_who: ["Small business", "Growing company", "Enterprise", "Startup", "Mid-market"],
    persona_role: ["owners", "managers", "directors", "VPs", "C-suite"],
    persona_mindset: ["tech-savvy", "traditional", "innovative", "cost-conscious", "growth-focused"],
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
    sections[currentSection].slots.forEach(slot => {
      if (!lockedSlots[slot]) {
        rollSlot(slot);
      }
    });
  };

  const rollAll = () => {
    Object.keys(slots).forEach(slot => {
      if (!lockedSlots[slot] && variations[slot]) {
        rollSlot(slot);
      }
    });
  };

  const saveStrategy = () => {
    const strategy = {
      timestamp: new Date().toISOString(),
      slots: { ...slots },
      locked: { ...lockedSlots }
    };
    console.log('Saved strategy:', strategy);
    // In a real app, save to backend or local storage
    alert('Strategy saved! (Check console)');
  };

  const renderVerticalSlot = (slotKey: string) => {
    const isLocked = lockedSlots[slotKey];
    const slotValue = slots[slotKey as keyof typeof slots];
    
    return (
      <div key={slotKey} className="relative">
        {/* Slot window with vertical scroll effect */}
        <div className="bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700 relative h-20">
          {/* Gradient overlays for slot machine effect */}
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
          
          {/* Slot content */}
          <div className="h-full flex items-center justify-center px-4">
            <div className={`text-center ${isLocked ? 'text-yellow-400' : 'text-white'} font-medium`}>
              {slotValue}
            </div>
          </div>
        </div>
        
        {/* Slot label */}
        <div className="text-xs text-gray-400 mt-1 text-center">
          {slotKey.replace(/([A-Z])/g, ' $1').replace(/\d+/g, ' $1').trim()}
        </div>
        
        {/* Controls */}
        <div className="flex gap-1 mt-2">
          <button
            onClick={() => toggleLock(slotKey)}
            className={`flex-1 p-2 rounded text-sm ${
              isLocked 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            } transition-colors`}
          >
            {isLocked ? <Lock size={14} className="mx-auto" /> : <Unlock size={14} className="mx-auto" />}
          </button>
          <button
            onClick={() => rollSlot(slotKey)}
            disabled={isLocked}
            className={`flex-1 p-2 rounded text-sm ${
              isLocked 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } transition-colors`}
          >
            <RefreshCw size={14} className="mx-auto" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            GTM Strategy Slot Machine
          </h1>
          <p className="text-gray-400 text-sm">Build your complete Go-To-Market strategy</p>
        </div>

        {/* Section Navigation */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="p-2 bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="bg-gray-800 px-4 py-2 rounded-lg min-w-[200px] text-center">
            <div className="text-xs text-gray-400">Section {currentSection + 1} of {sections.length}</div>
            <div className="font-semibold">{sections[currentSection].name}</div>
          </div>
          
          <button
            onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className="p-2 bg-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Slot Machine Panel */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sections[currentSection].slots.map(slot => renderVerticalSlot(slot))}
          </div>
          
          {/* Section Controls */}
          <div className="flex gap-3 mt-6 justify-center">
            <button
              onClick={rollSection}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
            >
              <Shuffle size={18} />
              Roll This Section
            </button>
            <button
              onClick={rollAll}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Roll Everything
            </button>
            <button
              onClick={saveStrategy}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <Save size={18} />
              Save Strategy
            </button>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Progress Overview</h3>
          <div className="grid grid-cols-5 gap-2">
            {sections.map((section, idx) => (
              <div 
                key={idx}
                className={`text-center p-2 rounded cursor-pointer transition-colors ${
                  idx === currentSection ? 'bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setCurrentSection(idx)}
              >
                <div className="text-xs">{section.name}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {section.slots.filter(s => lockedSlots[s]).length}/{section.slots.length} locked
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Strategy Summary */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Current Strategy</h3>
          <div className="text-sm space-y-1">
            <div><span className="text-gray-400">Target:</span> {slots.targetPersona} in {slots.industry} ({slots.companySize})</div>
            <div><span className="text-gray-400">Problem:</span> {slots.painPoint}</div>
            <div><span className="text-gray-400">Solution:</span> {slots.coreSolution} - {slots.uniqueValue}</div>
            <div><span className="text-gray-400">GTM:</span> {slots.channel1} + {slots.channel2} via {slots.salesMotion}</div>
            <div><span className="text-gray-400">Goals:</span> {slots.northStar}, {slots.revenue}, {slots.adoption}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GTMSlotMachine;