import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Starter", price: "$19", id: "starter" },
  { name: "Growth", price: "$39", id: "growth", popular: true },
  { name: "Pro", price: "$79", id: "pro" },
];

const Pricing = () => {
  const handleCheckout = async (plan: string) => {
    localStorage.setItem("user", JSON.stringify({
    id: "test123",
    plan: plan
  }));
    const res = await fetch(
      "https://leadrevive-backend-m3z6.onrender.com/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, userId: "test123" }),
      }
    );

    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert("Checkout failed");
  };

  return (
    <MainLayout>
      <div className="px-6 py-28 max-w-6xl mx-auto text-center">

        <h1 className="text-5xl font-bold mb-6">
          Pricing that pays for itself
        </h1>

        <p className="text-gray-400 mb-16">
          Recover just 1 missed customer and you’ve already made your money back.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 rounded-2xl border transition ${
                plan.popular
                  ? "border-white bg-white/10 scale-105 shadow-xl"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              {plan.popular && (
                <p className="text-green-400 text-sm mb-2">Most Popular</p>
              )}

              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="text-5xl font-bold mt-4">{plan.price}</p>

              <Button
                onClick={() => handleCheckout(plan.id)}
                className="w-full mt-8"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;