import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ⚠️ IMPORTANT: webhook needs raw BEFORE json
app.use("/api/stripe-webhook", express.raw({ type: "application/json" }));

app.use(cors());
app.use(express.json());

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.json({ status: "LeadRevive LIVE" });
});

// =====================
// CREATE CHECKOUT SESSION
// =====================
app.post("/api/create-checkout-session", async (req, res) => {
  const { userId, plan } = req.body;

  const priceMap = {
    starter: 1900,
    growth: 3900,
    pro: 7900,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${plan} plan`,
            },
            unit_amount: priceMap[plan],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
      metadata: {
        userId,
        plan,
      },
    });

    console.log("Checkout created:", session.id);

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Stripe failed" });
  }
});

// =====================
// STRIPE WEBHOOK (SAFE VERSION)
// =====================
app.post("/api/stripe-webhook", async (req, res) => {
  try {
    const event = JSON.parse(req.body.toString());

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const userId = session.metadata.userId;
      const plan = session.metadata.plan;

      await prisma.user.update({
        where: { id: userId },
        data: {
          isPaid: true,
          plan,
        },
      });

      console.log("User upgraded:", userId);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(400).send("Webhook Error");
  }
});

// =====================
// CREATE TEST USER (SAFE)
// =====================
app.get("/dev/create-user", async (req, res) => {
  try {
    const user = await prisma.user.upsert({
      where: { id: "test123" },
      update: {},
      create: {
        id: "test123",
        email: "test@test.com",
        isPaid: false,
        plan: "free",
      },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User creation failed" });
  }
});

// =====================
// CREATE LEAD (LOCKED)
// =====================
app.post("/api/leads", async (req, res) => {
  const { phone, userId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isPaid) {
      return res.status(403).json({
        error: "You must upgrade to use this feature",
      });
    }

    const events = JSON.stringify([
      `📞 Missed call from ${phone}`,
      `💬 SMS sent`,
      `🔁 Follow-up triggered`,
      `✅ Lead recovered`,
    ]);

    const lead = await prisma.lead.create({
      data: {
        phone,
        userId,
        events,
      },
    });

    res.json({
      ...lead,
      events: JSON.parse(lead.events),
    });
  } catch (err) {
    console.error("Lead error:", err);
    res.status(500).json({ error: "Lead creation failed" });
  }
});

// =====================
// GET LEADS
// =====================
app.get("/api/leads/:userId", async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(
      leads.map((l) => ({
        ...l,
        events: JSON.parse(l.events),
      }))
    );
  } catch (err) {
    console.error("Fetch leads error:", err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

// =====================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});