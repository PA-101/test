
import cors from "cors";
import dotenv from "dotenv";


dotenv.config(); // Loads .env file into process.env

// Initialize Express app
const app = express();

import express from "express";
import Stripe from "stripe";

// Initialize Stripe with SECRET key (NEVER expose this in frontend)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ---------------------------------------------
// MIDDLEWARE
// ---------------------------------------------

app.use(cors()); 
// Allows frontend (React) to talk to backend

app.use(express.json());
// Allows backend to read JSON body from requests

// ⚠️ IMPORTANT: Stripe webhook MUST use raw body
app.use("/webhook", express.raw({ type: "application/json" }));

// ---------------------------------------------
// STRIPE CHECKOUT SESSION ROUTE
// ---------------------------------------------

app.post("/create-checkout-session", async (req, res) => {
  const { plan, userId } = req.body;

  // Pricing in cents (Stripe requirement)
  const prices = {
    starter: 1900,
    growth: 3900,
    pro: 7900
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `LeadRevive AI - ${plan}`
            },
            unit_amount: prices[plan],
            recurring: {
              interval: "month"
            }
          },
          quantity: 1
        }
      ],

      metadata: {
        userId: userId // IMPORTANT: ties payment to user in your system
      },

      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/pricing?canceled=true`
    });

    // Send Stripe checkout URL to frontend
    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Checkout session failed" });
  }
});

// ---------------------------------------------
// WEBHOOK ROUTE (CRITICAL FOR MONEY)
// ---------------------------------------------

app.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    // Verify Stripe sent this event (security check)
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // -----------------------------------------
  // PAYMENT SUCCESS EVENT
  // -----------------------------------------
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;

    console.log("💰 Payment successful for user:", userId);

    // ⚠️ THIS IS WHERE YOU WILL CONNECT DATABASE LATER
    // Example:
    // - mark user as "active"
    // - unlock dashboard access
    // - store subscription ID
  }

  res.json({ received: true });
});

// ---------------------------------------------
// START SERVER
// ---------------------------------------------

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);
});