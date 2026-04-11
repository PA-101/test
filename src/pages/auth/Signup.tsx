import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error("All fields are required"); return; }
    setLoading(true);
    try {
      await signup({ name, email, password });
      toast.success("Account created!");
      navigate("/onboarding");
    } catch {
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-heading font-bold">Start your free trial</h1>
          <p className="text-muted-foreground">No credit card required. Set up in 2 minutes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@business.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-muted border-border" />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Start Free Trial"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Log In</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
