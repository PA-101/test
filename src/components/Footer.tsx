import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/30">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="font-heading font-semibold gradient-text">LeadRevive AI</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          <Link to="/how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
        </div>
        <p className="text-xs text-muted-foreground">LeadRevive AI — Automation that makes you money</p>
      </div>
    </div>
  </footer>
);

export default Footer;
