import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const steps = ["Business Info", "Contact", "Complete"];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [bizName, setBizName] = useState("");
  const [bizType, setBizType] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Setup complete! Welcome to LeadRevive.");
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="max-w-lg mx-auto py-8">
        <h1 className="text-2xl font-heading font-bold mb-2">Set up your account</h1>
        <p className="text-muted-foreground mb-8">Step {step + 1} of {steps.length}</p>

        {/* Progress */}
        <div className="flex gap-2 mb-10">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input placeholder="Acme Services" value={bizName} onChange={(e) => setBizName(e.target.value)} className="bg-muted border-border" />
            </div>
            <div className="space-y-2">
              <Label>Business Type</Label>
              <Input placeholder="HVAC, Dental, Spa, etc." value={bizType} onChange={(e) => setBizType(e.target.value)} className="bg-muted border-border" />
            </div>
            <Button onClick={() => { if (!bizName) { toast.error("Enter business name"); return; } setStep(1); }} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Continue
            </Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-muted border-border" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1 border-border text-foreground hover:bg-muted">Back</Button>
              <Button onClick={() => { if (!phone) { toast.error("Enter phone number"); return; } setStep(2); }} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Continue</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="glass rounded-xl p-8 text-center space-y-6">
            <p className="text-2xl">🎉</p>
            <h2 className="text-xl font-heading font-bold">You're all set!</h2>
            <p className="text-muted-foreground text-sm">Your account is ready. Start recovering leads now.</p>
            <Button onClick={handleFinish} disabled={loading} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Go to Dashboard"}
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Onboarding;
