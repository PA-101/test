import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

/* =========================
   STRIPE CHECKOUT ROUTE
========================= */

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { plan } = req.body;

    const prices = {
      starter: 1900,
      growth: 3900,
      pro: 7900,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${plan} Plan`,
            },
            unit_amount: prices[plan],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.BASE_URL}/success`,
      cancel_url: `${process.env.BASE_URL}/pricing`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("STRIPE ERROR:", err);
    res.status(500).json({ error: "Stripe failed" });
  }
});

/* =========================
   SERVE FRONTEND
========================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// point to root dist folder
const distPath = path.join(__dirname, "../dist");

app.use(express.static(distPath));

// handle React routing
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});