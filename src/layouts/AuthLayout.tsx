import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen">
    {/* Left branding panel */}
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12" style={{ background: "var(--gradient-hero)" }}>
      <div className="max-w-md text-center space-y-6">
        <Link to="/" className="inline-flex items-center gap-2">
          <Zap className="h-10 w-10 text-primary" />
          <span className="text-3xl font-heading font-bold gradient-text">LeadRevive AI</span>
        </Link>
        <p className="text-muted-foreground text-lg">
          Stop losing customers. Start capturing them automatically.
        </p>
        <div className="grid grid-cols-3 gap-4 pt-8">
          {["+40%", "2x", "24/7"].map((stat, i) => (
            <div key={i} className="glass rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stat}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {["Recovered", "Faster", "Always On"][i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right form panel */}
    <div className="flex w-full lg:w-1/2 items-center justify-center p-6 md:p-12 bg-background">
      <div className="w-full max-w-md">{children}</div>
    </div>
  </div>
);

export default AuthLayout;
