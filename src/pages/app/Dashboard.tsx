import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { triggerToast } from "@/components/Toast";

type Channel = "email" | "phone";

type Message = {
  from: "ai" | "system";
  text: string;
};

const API = "https://leadrevive-backend-m3z6.onrender.com";

const Dashboard = () => {
  const navigate = useNavigate();

  // =====================
  // USER STATE
  // =====================
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const isLoggedIn = !!user?.id;

  // =====================
  // DEMO STATE (LOCAL ONLY)
  // =====================
  const [demoUsed, setDemoUsed] = useState(false);

  useEffect(() => {
    const used = localStorage.getItem("demo_used");
    if (used === "true") setDemoUsed(true);
  }, []);

  // =====================
  // UI STATE
  // =====================
  const [channel, setChannel] = useState<Channel>("email");
  const [destination, setDestination] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [running, setRunning] = useState(false);

  const push = (msg: Message) =>
    setChat((prev) => [...prev, msg]);

  // =====================
  // MAIN ACTION
  // =====================
  const runAgent = async () => {
    if (!destination) {
      alert("Enter an email address");
      return;
    }

    // lock demo after 1 use (unlogged users only)
    if (demoUsed && !isLoggedIn) {
      triggerToast("Demo limit reached — please log in");
      navigate("/login");
      return;
    }

    if (channel !== "email") {
      triggerToast("Currently only email demo is enabled");
      return;
    }

    setRunning(true);
    setChat([]);

    push({
      from: "system",
      text: "Connecting AI Agent to email pipeline...",
    });

    try {
      const res = await fetch(`${API}/api/send-demo-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: destination }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      push({
        from: "ai",
        text: `Email successfully sent to ${destination}`,
      });

      push({
        from: "system",
        text: "Automation sequence complete ✔",
      });

      triggerToast("Message delivered successfully");

      // mark demo used
      if (!isLoggedIn) {
        localStorage.setItem("demo_used", "true");
        setDemoUsed(true);
      }

      // funnel to pricing
      setTimeout(() => {
        triggerToast("Unlock full automation to scale this");
        navigate("/pricing");
      }, 2000);
    } catch (err) {
      console.error(err);

      push({
        from: "system",
        text: "Failed to send email — check backend connection",
      });
    }

    setRunning(false);
  };

  // =====================
  // UI STATES
  // =====================
  const lockedOut = demoUsed && !isLoggedIn;

  return (
    <MainLayout>
      <div className="px-6 py-16 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            AI Outreach Engine
          </h1>

          <p className="text-gray-400 mt-2">
            Send automated AI-generated outreach messages instantly
          </p>

          {!isLoggedIn && (
            <p className="text-yellow-400 text-sm mt-2">
              Free demo: 1 execution allowed
            </p>
          )}
        </div>

        {/* LOCK SCREEN */}
        {lockedOut ? (
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-10 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-yellow-400">
              Demo Completed
            </h2>

            <p className="text-gray-400 mt-2">
              Unlock full AI automation to continue sending outreach.
            </p>

            <button
              onClick={() => navigate("/pricing")}
              className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-bold"
            >
              Upgrade Now
            </button>
          </div>
        ) : (
          <>
            {/* CONTROLS */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-10">
              <div className="flex gap-4 flex-wrap">

                <select
                  value={channel}
                  onChange={(e) =>
                    setChannel(e.target.value as Channel)
                  }
                  className="bg-black border border-white/10 px-4 py-3 rounded-lg"
                >
                  <option value="email">Email</option>
                </select>

                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-black border border-white/10"
                />

                <button
                  onClick={runAgent}
                  disabled={running}
                  className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-400 transition"
                >
                  {running ? "Running..." : "Launch AI Agent"}
                </button>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="space-y-3">
              {chat.length === 0 ? (
                <p className="text-gray-500">
                  No activity yet — run the agent to begin.
                </p>
              ) : (
                chat.map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.from === "ai"
                        ? "text-green-400"
                        : "text-gray-400"
                    }
                  >
                    {m.text}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;