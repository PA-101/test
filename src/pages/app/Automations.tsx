import DashboardLayout from "@/layouts/DashboardLayout";
import { Bot, MessageSquare, Clock } from "lucide-react";

const automations = [
  { icon: MessageSquare, title: "Missed Call Auto-Text", desc: "Sends a text within 30 seconds of a missed call.", active: true },
  { icon: Clock, title: "Follow-Up Sequence", desc: "3-step follow-up over 48 hours for unresponsive leads.", active: true },
  { icon: Bot, title: "Review Request", desc: "Automatically requests a review after lead conversion.", active: false },
];

const Automations = () => (
  <DashboardLayout>
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold">Automations</h2>
        <p className="text-muted-foreground text-sm">Your active automation workflows.</p>
      </div>

      <div className="grid gap-4">
        {automations.map((a) => (
          <div key={a.title} className="glass rounded-xl p-6 flex items-center gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <a.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${a.active ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
              {a.active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default Automations;
