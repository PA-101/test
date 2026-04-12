import { createCheckoutSession } from "@/services/billingService";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$19",
    desc: "Perfect for solo businesses",
    features: ["100 auto-texts/mo", "Missed call recovery", "Basic analytics", "Email support"],
    highlighted: false,
    id: "starter",
  },
  {
    name: "Growth",
    price: "$39",
    desc: "For growing teams",
    features: ["500 auto-texts/mo", "Smart follow-ups", "Review requests", "Advanced analytics", "Priority support"],
    highlighted: true,
    id: "growth",
  },
  {
    name: "Pro",
    price: "$79",
    desc: "Unlimited power",
    features: ["Unlimited texts", "All automations", "Custom workflows", "API access", "Dedicated manager"],
    highlighted: false,
    id: "pro",
  },
];

const Pricing = () => {
  const handleCheckout = async (planId: string) => {
    console.log("CLICKED:", planId);

    const res = await fetch(
      "https://leadrevive-backend-m3z6.onrender.com/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planId, // ✅ FIXED HERE
          userId: "test123",
        }),
      }
    );

    const data = await res.json();
    console.log("RESPONSE:", data);

    if (!data.url) {
      alert("NO URL RETURNED");
      return;
    }

    window.location.href = data.url;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl p-8 space-y-6 transition-all ${
                plan.highlighted ? "glass glow-border scale-105" : "glass"
              }`}
            >
              <h3 className="text-xl font-heading font-bold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.desc}</p>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-heading font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleCheckout(plan.id)} // ✅ FIXED HERE
                className={`w-full ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Secure payments powered by Stripe
        </p>
      </div>
    </MainLayout>
  );
};

export default Pricing;