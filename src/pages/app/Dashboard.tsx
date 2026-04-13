import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { triggerToast } from "@/components/Toast";

type Channel = "email" | "phone";

type Message = {
  from: "ai" | "system";
  text: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const isLoggedIn = !!user?.id;

  const [channel, setChannel] = useState<Channel>("phone");
  const [destination, setDestination] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [running, setRunning] = useState(false);
  const [hasRunDemo, setHasRunDemo] = useState(false);

  const demo = params.get("demo");

  const sleep = (ms: number) =>
    new Promise((r) => setTimeout(r, ms));

  const push = (m: Message) =>
    setChat((prev) => [...prev, m]);

  const runAgent = async () => {
    // 🔒 FORCE LOGIN WITH INTENT
    if (!isLoggedIn) {
      triggerToast("Please log in to use AI Agent");
      navigate("/login?demo=true");
      return;
    }

    if (!destination) {
      alert(
        channel === "email"
          ? "Enter an email address"
          : "Enter a phone number"
      );
      return;
    }

    setRunning(true);
    setChat([]);

    push({
      from: "system",
      text: `AI Agent initialized (${channel.toUpperCase()})`,
    });

    await sleep(1000);

    push({
      from: "ai",
      text:
        channel === "email"
          ? `Sending personalized email to ${destination}...`
          : `Sending SMS to ${destination}...`,
    });

    await sleep(1500);

    push({
      from: "system",
      text: "Message delivered ✔",
    });

    await sleep(1200);

    push({
      from: "ai",
      text:
        channel === "email"
          ? `Subject: Unlock AI automation access\n\nWe reached out earlier — your AI workflow is ready.`
          : `Hey! Your AI automation setup is ready. Reply YES to continue.`,
    });

    await sleep(1500);

    push({
      from: "system",
      text: "Waiting for response...",
    });

    await sleep(1500);

    push({
      from: "ai",
      text:
        "No response detected — upgrade required to continue automation.",
    });

    setRunning(false);
  };

  // 🔥 AUTO-RUN DEMO AFTER LOGIN
  useEffect(() => {
    if (demo === "true" && isLoggedIn && !hasRunDemo) {
      setHasRunDemo(true);

      // optional: auto-fill demo destination if empty
      if (!destination) {
        setDestination(
          channel === "email"
            ? "demo@email.com"
            : "+1 (555) 123-4567"
        );
      }

      setTimeout(() => {
        runAgent();
      }, 800);
    }
  }, [demo, isLoggedIn]);

  return (
    <MainLayout>
      <div className="px-6 py-16 max-w-6xl mx-auto">

        {/* LOCKED STATE */}
        {!isLoggedIn ? (
          <div className="bg-red-500/10 border border-red-500/30 p-10 rounded-xl text-center">
            <h1 className="text-2xl font-bold text-red-400">
              Login Required
            </h1>

            <p className="text-gray-400 mt-2">
              You must log in to access the AI Agent demo
            </p>

            <button
              onClick={() => navigate("/login?demo=true")}
              className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-bold"
            >
              Continue to Login
            </button>
          </div>
        ) : (
          <>
            {/* HERO */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold">
                AI Outreach Agent
              </h1>

              <p className="text-gray-400 mt-2">
                Run automated outreach simulations
              </p>

              <p className="text-green-400 text-sm mt-2 animate-pulse">
                ● Agent ready
              </p>
            </div>

            {/* CONTROLS */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-10">
              <div className="flex gap-4 mb-4">
                <select
                  value={channel}
                  onChange={(e) =>
                    setChannel(e.target.value as Channel)
                  }
                  className="bg-black border border-white/10 px-4 py-3 rounded-lg"
                >
                  <option value="phone">SMS</option>
                  <option value="email">Email</option>
                </select>

                <input
                  value={destination}
                  onChange={(e) =>
                    setDestination(e.target.value)
                  }
                  placeholder={
                    channel === "email"
                      ? "Enter email address"
                      : "Enter phone number"
                  }
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
              {chat.map((m, i) => (
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
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;