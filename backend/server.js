import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

app.use(cors());
app.use(express.json());

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.json({ status: "LeadRevive LIVE" });
});

// =====================
// LOGIN (NEW FIX)
// =====================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // TEMP PASSWORD LOGIC (replace later with bcrypt)
    const passwordMatch = password === "password123";

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        isPaid: user.isPaid,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        isPaid: user.isPaid,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// =====================
// STRIPE CHECKOUT
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
      metadata: { userId, plan },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe failed" });
  }
});

// =====================
// LEADS (UNCHANGED FOR NOW)
// =====================
app.post("/api/leads", async (req, res) => {
  const { phone, userId } = req.body;

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
    data: { phone, userId, events },
  });

  res.json({
    ...lead,
    events: JSON.parse(lead.events),
  });
});

// =====================
// GET LEADS
// =====================
app.get("/api/leads/:userId", async (req, res) => {
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
});

// =====================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});