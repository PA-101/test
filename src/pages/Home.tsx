import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
  const navigate = useNavigate();

  const handleLaunch = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // 🔥 DIRECT CHECK — NO HOOK
    if (!user?.id) {
      navigate("/login?demo=true");
    } else {
      navigate("/dashboard?demo=true");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-5xl font-bold mb-4">
          AI That Closes Leads Automatically
        </h1>

        <p className="text-gray-400 mb-8 max-w-xl">
          Instantly reach out, follow up, and convert missed opportunities into revenue.
        </p>

        <button
          onClick={handleLaunch}
          className="bg-green-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition"
        >
          Launch AI Agent
        </button>

      </div>
    </MainLayout>
  );
};

export default Home;