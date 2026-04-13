import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* SOFT GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_60%)] pointer-events-none" />

      <Navbar />

      <main className="relative z-10">{children}</main>

      <footer className="text-center text-xs text-gray-500 py-10 border-t border-white/10 mt-20">
        AI-driven sales automation for modern businesses
      </footer>
    </div>
  );
};

export default MainLayout;