import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const Home = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-5xl font-bold mb-4">
          AI That Follows Up For You
        </h1>

        <p className="text-gray-400 mb-8 max-w-xl">
          Automatically message leads, recover missed opportunities, and close deals — without lifting a finger.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition"
        >
          Try Demo
        </button>

      </div>
    </MainLayout>
  );
};

export default Home;