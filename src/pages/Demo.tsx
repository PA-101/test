import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const Demo = () => {
  const navigate = useNavigate();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const startDemo = () => {
    if (!user?.id) {
      navigate("/login?redirect=demo");
    } else {
      navigate("/dashboard?demo=true");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-4xl font-bold mb-4">
          Try The AI Agent Live
        </h1>

        <p className="text-gray-400 mb-8 max-w-xl">
          Enter your email or phone and watch the AI simulate a real outreach conversation.
        </p>

        <button
          onClick={startDemo}
          className="bg-green-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-400 transition"
        >
          Start Demo
        </button>

      </div>
    </MainLayout>
  );
};

export default Demo;