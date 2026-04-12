import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState<string[]>([]);

  const handleSimulate = () => {
    if (!phone) {
      alert("Enter a phone number");
      return;
    }

    const newEvents = [
      `📞 Missed call from ${phone}`,
      `💬 SMS sent to ${phone}`,
      `✅ Customer replied and booked`,
    ];

    setActivity((prev) => [...newEvents, ...prev]);
    setPhone("");
  };

  return (
    <MainLayout>
      <div className="px-6 py-20 max-w-6xl mx-auto">

        <h1 style={{ color: "red" }}>
          DASHBOARD TEST ACTIVE
          </h1>

        <p className="text-gray-400 mb-8">
          Current Plan: {user.plan || "Free"}
        </p>

        {/* SIMULATION BOX */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <h2 className="font-semibold mb-4">
            Missed Call Simulation
          </h2>

          <div className="flex gap-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="flex-1 px-4 py-2 rounded-lg bg-black border border-white/10 text-white"
            />

            <button
              onClick={handleSimulate}
              className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200"
            >
              Run
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Recovered Leads", value: activity.length },
            { label: "Estimated Revenue", value: `$${activity.length * 50}` },
            { label: "Active Automations", value: "1" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 p-6 rounded-xl border border-white/10"
            >
              <p className="text-gray-400 text-sm">
                {stat.label}
              </p>
              <h2 className="text-2xl font-bold mt-2">
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* ACTIVITY FEED */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="font-semibold mb-4">
            Live Activity
          </h2>

          {activity.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No activity yet. Run a simulation.
            </p>
          ) : (
            <div className="space-y-2 text-sm text-gray-300">
              {activity.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;