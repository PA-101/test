import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

/**
 * Middleware
 * - cors: allows frontend to call backend
 * - express.json: reads JSON body from requests
 */
app.use(cors({ origin: "*" }));
app.use(express.json());

/**
 * Stripe initialization
 * MUST have STRIPE_SECRET_KEY in Render env vars
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Health check route
 */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/**
 * PLAN CONFIGURATION (SAFE + CLEAN)
 * Centralized pricing logic
 */
const priceMap = {
  starter: {
    name: "Starter Plan",
    amount: 1900,
  },
  growth: {
    name: "Growth Plan",
    amount: 3900,
  },
  pro: {
    name: "Pro Plan",
    amount: 7900,
  },
};

/**
 * STRIPE CHECKOUT ROUTE
 */
app.post("/create-checkout-session", async (req, res) => {
  try {
    console.log("🔥 Checkout request received");

    const { plan, userId } = req.body;

    console.log("Plan received:", plan);
    console.log("UserId:", userId);
    console.log("Stripe key exists:", !!process.env.STRIPE_SECRET_KEY);

    const selectedPlan = priceMap[plan];

    // Validate plan
    if (!selectedPlan) {
      return res.status(400).json({
        error: "Invalid plan selected",
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selectedPlan.name,
            },
            unit_amount: selectedPlan.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
    });

    console.log("✅ Stripe session created:", session.id);

    return res.json({
      url: session.url,
    });
  } catch (error) {
    console.error("❌ Stripe error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});