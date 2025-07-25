import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { GTM_Project, GTM_Stage_Data } from '@/lib/types';

interface ProjectStore {
  projects: GTM_Project[];
  currentProjectId: string | null;
  createNewProject: () => GTM_Project;
  updateProject: (projectId: string, updates: Partial<GTM_Project>) => void;
  setCurrentProject: (projectId: string) => void;
  getCurrentProject: () => GTM_Project | null;
}

// Initialize empty stages
const createInitialStages = (): GTM_Stage_Data[] => {
  const stageNames = [
    "Proof of concept",
    "Proof of monetization", 
    "Proof of at least one scalable GTM motion",
    "Proof of sustainable business model",
    "Proof of market expansion"
  ];

  return stageNames.map((_, index) => ({
    stageIndex: index as 0 | 1 | 2 | 3 | 4,
    status: index === 0 ? 'active' : 'locked',
    beachheadStrategy: '',
    validationMethods: [],
    gtmMotions: [],
    rationale: ['', '', ''],
    kpis: ['', '', ''],
    pmfCycleLog: []
  }));
};

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  currentProjectId: null,

  createNewProject: () => {
    const newProject: GTM_Project = {
      projectId: uuidv4(),
      canvasData: {
        marketTruths: ['', '', ''],
        productDefinition: '',
        problemStatement: '',
        targetCustomer: '',
        competitiveAlternatives: '',
        competitiveEdgeUVP: '',
        pricingAndPackaging: '',
        longTermObjective: ['', '', '']
      },
      stages: createInitialStages(),
      metadata: {
        createdAt: new Date(),
        lastUpdated: new Date()
      }
    };

    set((state) => ({
      projects: [...state.projects, newProject],
      currentProjectId: newProject.projectId
    }));

    return newProject;
  },

  updateProject: (projectId, updates) => {
    set((state) => ({
      projects: state.projects.map((project) => 
        project.projectId === projectId
          ? { 
              ...project, 
              ...updates,
              metadata: {
                ...project.metadata,
                lastUpdated: new Date()
              }
            }
          : project
      )
    }));
  },

  setCurrentProject: (projectId) => {
    set({ currentProjectId: projectId });
  },

  getCurrentProject: () => {
    const { projects, currentProjectId } = get();
    return projects.find(p => p.projectId === currentProjectId) || null;
  }
}));