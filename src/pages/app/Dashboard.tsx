import { useEffect, useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { leadService } from "@/services/leadService";
import { Users, MessageSquare, Star, TrendingUp } from "lucide-react";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leadService.fetchStats().then((s) => { setStats(s); setLoading(false); });
  }, []);

  if (loading) return <DashboardLayout><Loader /></DashboardLayout>;

  const cards = [
    { icon: Users, label: "Leads Recovered", value: stats.recoveredLeads, color: "text-primary" },
    { icon: MessageSquare, label: "Messages Sent", value: stats.messagesSent, color: "text-accent" },
    { icon: Star, label: "Reviews Generated", value: stats.reviewsGenerated, color: "text-warning" },
    { icon: TrendingUp, label: "Conversion Rate", value: stats.conversionRate + "%", color: "text-success" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-heading font-bold">Overview</h2>
          <p className="text-muted-foreground text-sm">Your lead recovery performance at a glance.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="glass rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{c.label}</span>
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </div>
              <p className="text-3xl font-heading font-bold">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div className="glass rounded-xl p-6">
          <h3 className="font-heading font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New lead captured: Sarah Johnson", time: "2 min ago" },
              { text: "Auto-text sent to Mike Chen", time: "15 min ago" },
              { text: "Review request sent to Emily Davis", time: "1 hour ago" },
              { text: "Lead converted: Robert Taylor", time: "3 hours ago" },
            ].map((a) => (
              <div key={a.text} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                <span className="text-sm">{a.text}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
