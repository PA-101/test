import { Link } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-white relative">

      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
        <Link to="/" className="text-2xl font-bold">
          LeadRevive
        </Link>

        <div className="flex items-center gap-8 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white">
            Home
          </Link>

          <Link to="/pricing" className="text-gray-400 hover:text-white">
            Pricing
          </Link>

          <Link
            to="/pricing"
            className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="text-center text-gray-500 py-10 text-sm">
        © {new Date().getFullYear()} LeadRevive
      </footer>
    </div>
  );
};

export default MainLayout;