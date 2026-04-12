import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // simulate processing + redirect to dashboard
    setTimeout(() => {
      navigate("/app/dashboard");
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-400">
          Setting up your account...
        </p>
      </div>
    </div>
  );
};

export default Success;