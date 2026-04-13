import React, { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";

const API = "https://leadrevive-backend-m3z6.onrender.com";

type Lead = {
  id: string;
  phone: string;
  events: string[] | string;
};

const Dashboard = () => {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const [phone, setPhone] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const createLead = async () => {
    if (!phone) return alert("Enter phone number");

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/leads`, {
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
    } catch (err) {
      console.error(err);
      alert("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  const loadLeads = async () => {
    try {
      const res = await fetch(
        `${API}/api/leads/${user.id || "demo-user"}`
      );

      const data = await res.json();

      setLeads(Array.isArray(data) ? data : data.leads || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load leads");
    } finally {
      setInitialLoading(false);
    }
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
          Recover lost customers automatically
        </p>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10 mb-10 backdrop-blur">
          <h2 className="font-semibold mb-4">
            Trigger Recovery Flow
          </h2>

          <div className="flex gap-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="flex-1 px-4 py-2 rounded-lg bg-black border border-white/10 text-white outline-none"
            />

            <button
              onClick={createLead}
              disabled={loading}
              className="bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              {loading ? "Processing..." : "Recover Lead"}
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Total Leads</p>
            <h2 className="text-2xl font-bold">{leads.length}</h2>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Recovered Revenue</p>
            <h2 className="text-2xl font-bold">
              ${leads.length * 75}
            </h2>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Automation Rate</p>
            <h2 className="text-2xl font-bold">78%</h2>
          </div>
        </div>

        <div className="space-y-4">
          {initialLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : leads.length === 0 ? (
            <p className="text-gray-500">
              No leads yet. Start by triggering a recovery.
            </p>
          ) : (
            leads.map((lead) => {
              const events =
                typeof lead.events === "string"
                  ? JSON.parse(lead.events)
                  : lead.events;

              return (
                <div
                  key={lead.id}
                  className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                  <h3 className="font-bold mb-2">
                    📞 {lead.phone}
                  </h3>

                  <div className="text-sm text-gray-300 space-y-1">
                    {events.map((e: string, i: number) => (
                      <p key={i}>{e}</p>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;