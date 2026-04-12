import { Link } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-xl sticky top-0 z-50 bg-black/60">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          LeadRevive
        </Link>

        <div className="flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/pricing" className="hover:text-gray-300 transition">
            Pricing
          </Link>

          <Link
            to="/pricing"
            className="bg-white text-black px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="relative z-10">{children}</main>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-12 border-t border-white/10 mt-24">
        © {new Date().getFullYear()} LeadRevive — Built to recover lost revenue.
      </footer>
    </div>
  );
};

export default MainLayout;