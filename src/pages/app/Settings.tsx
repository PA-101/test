import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h2 className="text-2xl font-heading font-bold">Settings</h2>
          <p className="text-muted-foreground text-sm">Manage your account and subscription.</p>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h3 className="font-heading font-semibold">Account Information</h3>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border/30">
              <span className="text-muted-foreground">Name</span>
              <span>{user?.name || "—"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/30">
              <span className="text-muted-foreground">Email</span>
              <span>{user?.email || "—"}</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-4">
          <h3 className="font-heading font-semibold">Subscription</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Growth Plan</p>
              <p className="text-xs text-muted-foreground">$39/month • Renews April 10, 2026</p>
            </div>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Active</span>
          </div>
        </div>

        <Button variant="outline" onClick={handleLogout} className="border-destructive/30 text-destructive hover:bg-destructive/10">
          Logout
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
