import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [phone, setPhone] = useState("");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const API = "https://leadrevive-backend-m3z6.onrender.com";

  /**
   * CREATE REAL LEAD (BACKEND CALL)
   */
  const handleSimulate = async () => {
    if (!phone) return alert("Enter phone number");

    setLoading(true);

    const res = await fetch(`${API}/api/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        userId: user.id || "demo-user",
      }),
    });

    const data = await res.json();

    setLeads((prev) => [data, ...prev]);
    setPhone("");
    setLoading(false);
  };

  /**
   * LOAD EXISTING LEADS
   */
  const loadLeads = async () => {
    const res = await fetch(`${API}/api/leads/${user.id || "demo-user"}`);
    const data = await res.json();
    setLeads(data);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <MainLayout>
      <div className="px-6 py-20 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          Lead Recovery Dashboard
        </h1>

        <p className="text-gray-400 mb-8">
          Real-time lead recovery system
        </p>

        {/* INPUT */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10">
          <h2 className="font-semibold mb-4">
            Create Lead Event
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
              disabled={loading}
              className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
            >
              {loading ? "Processing..." : "Create Lead"}
            </button>
          </div>
        </div>

        {/* LEADS FEED */}
        <div className="space-y-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white/5 p-6 rounded-xl border border-white/10"
            >
              <h3 className="font-bold mb-2">
                Lead: {lead.phone}
              </h3>

              <div className="text-sm text-gray-300 space-y-1">
                {lead.events.map((e: string, i: number) => (
                  <p key={i}>{e}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;