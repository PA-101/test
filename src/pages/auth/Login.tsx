import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:10000";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setError(null);

    if (!email || !password) {
      setError("Enter email + password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Backend not running or unreachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl">

        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && (
          <div className="text-red-400 text-sm mb-3">
            {error}
          </div>
        )}

        <input
          className="w-full mb-3 px-4 py-3 bg-black border border-white/10 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-5 px-4 py-3 bg-black border border-white/10 rounded-lg"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-3 rounded-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-gray-500 mt-4">
          Use password: <b>password123</b>
        </p>

      </div>
    </div>
  );
};

export default Login;