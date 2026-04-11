import { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Enter your email"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    toast.success("Reset link sent!");
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-heading font-bold">Reset password</h1>
          <p className="text-muted-foreground">We'll send you a reset link.</p>
        </div>

        {sent ? (
          <div className="glass rounded-xl p-8 text-center space-y-4">
            <p className="text-success font-medium">Check your email!</p>
            <p className="text-sm text-muted-foreground">We sent a password reset link to {email}</p>
            <Link to="/login"><Button variant="outline" className="border-border text-foreground hover:bg-muted">Back to Login</Button></Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-muted border-border" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
            </Button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
