import MainLayout from "@/layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="px-6 py-20 max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Recovered Leads", value: "128" },
            { label: "Estimated Revenue", value: "$6,420" },
            { label: "Active Automations", value: "3" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 p-6 rounded-xl border border-white/10"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <h2 className="text-2xl font-bold mt-2">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* ACTIVITY */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h2 className="font-semibold mb-4">Recent Activity</h2>

          <div className="space-y-3 text-sm text-gray-400">
            <p>Missed call → SMS sent → Customer booked</p>
            <p>Missed call → SMS sent → Awaiting reply</p>
            <p>Missed call → Follow-up sent → Booked</p>
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default Dashboard;