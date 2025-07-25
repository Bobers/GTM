// Represents a single test loop within the PMF Cycle
export interface PMF_Cycle_Iteration {
  iterationId: string;
  status: 'active' | 'archived_pivoted' | 'archived_validated';
  productHypothesis: string;
  testPlan: string;
  learnings: string;
}

// Represents the strategic decisions and tests for one of the 5 GTM stages
export interface GTM_Stage_Data {
  stageIndex: 0 | 1 | 2 | 3 | 4;
  status: 'locked' | 'active' | 'complete';
  beachheadStrategy: string;
  validationMethods: string[]; // e.g., ["Interviews", "Testing MVP"]
  gtmMotions: string[];      // e.g., ["Community", "Inbound"]
  rationale: string[];       // Array of 3 strings from the sticky notes
  kpis: string[];            // Array of 3 strings from the KPI fields
  pmfCycleLog: PMF_Cycle_Iteration[]; 
}

// The main project object, the single source of truth
export interface GTM_Project {
  projectId: string;

  // Data from the top-level Strategic Canvas
  canvasData: {
    marketTruths: string[]; // Array of 3 strings
    productDefinition: string;
    problemStatement: string;
    targetCustomer: string;
    competitiveAlternatives: string;
    competitiveEdgeUVP: string;
    pricingAndPackaging: string;
    longTermObjective: string[]; // Array of 3 strings
  };
  
  // The user's progress and decisions through the 5 stages
  stages: GTM_Stage_Data[];

  metadata: {
    createdAt: Date;
    lastUpdated: Date;
  };
}