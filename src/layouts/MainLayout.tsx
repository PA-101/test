import { Link } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-black/70">
        <Link to="/" className="text-xl font-bold tracking-tight">
          LeadRevive
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/pricing" className="hover:text-gray-300">
            Pricing
          </Link>
          <Link
            to="/pricing"
            className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-10 border-t border-white/10 mt-20">
        © {new Date().getFullYear()} LeadRevive. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;