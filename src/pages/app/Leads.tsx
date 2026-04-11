import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { leadService, Lead } from "@/services/leadService";
import Loader from "@/components/Loader";

const statusStyles: Record<string, string> = {
  new: "bg-info/10 text-info",
  contacted: "bg-warning/10 text-warning",
  converted: "bg-success/10 text-success",
};

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leadService.fetchLeads().then((l) => { setLeads(l); setLoading(false); });
  }, []);

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-heading font-bold">Leads</h2>
          <p className="text-muted-foreground text-sm">All captured leads and their status.</p>
        </div>

        {leads.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-muted-foreground">No leads yet — once active, they'll appear here.</p>
          </div>
        ) : (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-muted-foreground font-medium">Name</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Phone</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{lead.name}</td>
                      <td className="p-4 text-muted-foreground">{lead.phone}</td>
                      <td className="p-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Leads;
