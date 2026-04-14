import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API = "http://localhost:10000";

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const redirect = params.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch(`${API}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    // 🔥 SMART REDIRECT
    if (redirect === "demo") {
      navigate("/dashboard?demo=true");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/5 p-8 rounded-xl w-[320px]">
        <h1 className="text-xl mb-4">Login</h1>

        <input
          className="w-full mb-2 p-2 bg-black border border-white/20"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 bg-black border border-white/20"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-white text-black p-2"
        >
          Login
        </button>

        <p className="text-xs text-gray-500 mt-3">
          Use password: password123
        </p>
      </div>
    </div>
  );
};

export default Login;