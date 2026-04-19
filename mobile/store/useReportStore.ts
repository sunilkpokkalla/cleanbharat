import { create } from 'zustand';

export type ReportStatus = 'reported' | 'in_progress' | 'resolved';

export interface Report {
  id: string;
  title: string;
  location: string;
  ward: string;
  description: string;
  timestamp: string;
  status: ReportStatus;
  imageUrl: string;
  supportedCount: number;
}

interface ReportState {
  reports: Report[];
  addReport: (report: Report) => void;
  supportReport: (id: string) => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reports: [
    {
      id: '1',
      title: 'Severe Pothole on Main Arterial',
      location: 'Andheri West',
      ward: 'Ward 42',
      description: 'Large crater formed after recent rains, causing significant traffic slowdowns and potential hazard to two-wheelers.',
      timestamp: '2 hrs ago',
      status: 'reported',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvAxygoORhk5gY5M2OuXowaYdO4shceemiIPYqn3bGgVMNs-6QgKedGAXIODcLkIMytm-3QFi2jFMnM00cBlkfEdhXnuHAwqPmODBn2E1CiQlD97LIoC__yY3eNQWaKsvCfXnrzLgwNfHFqMr1KPddjAJcSZfd3AUAVhtT783Yx_mGl6uOjqRBx8tc88ocSZv4rjD_XcdizTRYpQ9g3hYgkkaXXR-AkgNBwgSC7QEFqaKyLAZ-S1RknwTe3jQDcPqg6sXnNcccQL8',
      supportedCount: 24,
    },
    {
      id: '2',
      title: 'Overflowing Public Bins',
      location: 'Indiranagar',
      ward: 'Ward 12',
      description: 'Waste collection has been missed for two consecutive days. Stray animals are spreading the garbage across the pedestrian walkway.',
      timestamp: '5 hrs ago',
      status: 'in_progress',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzb412rI0x-9ontLIyDh4uJH8ZedSxEvwnLYd8YZevU9dOde3LlXltpm53zCUOW1_S19E0VvuCk6SN6edsop2s2kwTaM_WGBRpq85IwSVuBNeCwOgvw5VCPcAfpm0vxaltu5mADnb7oiI1ORNn8XrsCtWBPAaEl9zWJWFnLgBk9oIBp-fadDtt1nMiusRp6bXW2eXm3YnOtBXyCgKhtItDIGhYFP7LFe5Hy0kwxp6_AHX85G8ezNdFBF_Z2YvTDXOcGXqsEECmkaE',
      supportedCount: 8,
    },
    {
      id: '3',
      title: 'Broken Streetlight Fixed',
      location: 'Koramangala',
      ward: 'Ward 8',
      description: 'The non-functioning LED fixture near the park entrance has been replaced by the municipal electricity board.',
      timestamp: '1 day ago',
      status: 'resolved',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX7fZsJhuxRwKVbUyTtrw5GKmJbAXENXsaDdFLP2Mut4nRhii5svJUQ-zgRrohC4QH1QVF2xNavSP3FkjSDw5J-jYS8XagG9UPVuomCk9yg9SfICFWu6snagPwge5RC8fkarthKXHO95mrAEB2UJaum7tiae1iMMG-s7vR7h8Se3e1385RUOMXeg5usqsv9W_aP0yQ6Oyjm88oO-TdJUyb5zrxgRfDJj-TN5zuxWeTp9Zd890rm_ncsLVIgoX3lbRz4P-4PzY6Ucw',
      supportedCount: 42,
    },
  ],
  addReport: (report) => set((state) => ({ 
    reports: [
      { 
        ...report, 
        id: Math.random().toString(36).substring(7),
        timestamp: 'Just now',
        status: 'reported' as const,
      }, 
      ...state.reports 
    ] 
  })),
  supportReport: (id) => set((state) => ({
    reports: state.reports.map((r) => r.id === id ? { ...r, supportedCount: r.supportedCount + 1 } : r)
  }))
}));
