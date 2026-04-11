import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const NotFound = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-6xl font-heading font-bold gradient-text mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <div className="flex gap-4">
        <Link to="/">
          <Button variant="outline" className="border-border text-foreground hover:bg-muted">Home</Button>
        </Link>
        {isAuthenticated && (
          <Link to="/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Dashboard</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NotFound;
