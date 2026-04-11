import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-bold">
          <Zap className="h-6 w-6 text-primary" />
          <span className="gradient-text">LeadRevive</span>
          <span className="text-muted-foreground font-normal text-sm">AI</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Start Free Trial</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/settings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Settings</Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/50 px-4 pb-4 pt-2 space-y-2">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/pricing" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Pricing</Link>
              <Link to="/login" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Log In</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full bg-primary text-primary-foreground">Start Free Trial</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link to="/settings" className="block py-2 text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Settings</Link>
              <button className="block py-2 text-sm text-muted-foreground" onClick={() => { handleLogout(); setMobileOpen(false); }}>Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
