import { Link, useLocation, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string) =>
    `text-sm transition ${
      isActive(path)
        ? "text-white font-semibold"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Zap className="h-6 w-6 text-green-400" />
          LeadRevive
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-8">

          <Link to="/" className={linkStyle("/")}>
            Home
          </Link>

          <Link to="/pricing" className={linkStyle("/pricing")}>
            Pricing
          </Link>

          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Demo
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-400 hover:text-white text-sm">
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Start Free
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;