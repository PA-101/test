import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";

const API = "https://leadrevive-backend-m3z6.onrender.com";

const Pricing = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const buyPlan = async (plan: "starter" | "growth" | "pro") => {
    try {
      setLoadingPlan(plan);

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const res = await fetch(`${API}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id || "test123",
          plan,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        alert("Stripe session failed");
        return;
      }

      // 🚨 CRITICAL: redirect user
      window.location.href = data.url;

    } catch (err) {
      console.error(err);
      alert("Payment error");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <MainLayout>
      <div className="px-6 py-20 max-w-6xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          Unlock Full AI Automation
        </h1>

        <p className="text-gray-400 mb-12">
          One-click outreach. Infinite revenue recovery.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* STARTER */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-2">Starter</h2>
            <p className="text-gray-400 mb-4">For testing the system</p>
            <p className="text-3xl font-bold mb-6">$19</p>

            <button
              onClick={() => buyPlan("starter")}
              className="bg-white text-black px-6 py-3 rounded-lg w-full font-bold"
            >
              {loadingPlan === "starter" ? "Loading..." : "Get Starter"}
            </button>
          </div>

          {/* GROWTH */}
          <div className="bg-white/10 border border-white/20 p-8 rounded-xl scale-105">
            <h2 className="text-xl font-bold mb-2">Growth</h2>
            <p className="text-gray-400 mb-4">Best for small businesses</p>
            <p className="text-3xl font-bold mb-6">$39</p>

            <button
              onClick={() => buyPlan("growth")}
              className="bg-green-500 text-black px-6 py-3 rounded-lg w-full font-bold"
            >
              {loadingPlan === "growth" ? "Loading..." : "Get Growth"}
            </button>
          </div>

          {/* PRO */}
          <div className="bg-white/5 border border-white/10 p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-2">Pro</h2>
            <p className="text-gray-400 mb-4">Full automation engine</p>
            <p className="text-3xl font-bold mb-6">$79</p>

            <button
              onClick={() => buyPlan("pro")}
              className="bg-white text-black px-6 py-3 rounded-lg w-full font-bold"
            >
              {loadingPlan === "pro" ? "Loading..." : "Get Pro"}
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;