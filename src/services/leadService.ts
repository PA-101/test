export interface Lead {
  id: string;
  name: string;
  phone: string;
  status: "new" | "contacted" | "converted";
  date: string;
}

const mockLeads: Lead[] = [
  { id: "1", name: "Sarah Johnson", phone: "(555) 123-4567", status: "converted", date: "2026-04-09" },
  { id: "2", name: "Mike Chen", phone: "(555) 234-5678", status: "contacted", date: "2026-04-09" },
  { id: "3", name: "Emily Davis", phone: "(555) 345-6789", status: "new", date: "2026-04-10" },
  { id: "4", name: "James Wilson", phone: "(555) 456-7890", status: "contacted", date: "2026-04-08" },
  { id: "5", name: "Lisa Anderson", phone: "(555) 567-8901", status: "new", date: "2026-04-10" },
  { id: "6", name: "Robert Taylor", phone: "(555) 678-9012", status: "converted", date: "2026-04-07" },
];

export const leadService = {
  fetchLeads: async (): Promise<Lead[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockLeads;
  },
  fetchStats: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return {
      recoveredLeads: 147,
      messagesSent: 523,
      reviewsGenerated: 89,
      conversionRate: 42,
    };
  },
};
