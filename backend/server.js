import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const app = express();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const JWT_SECRET = "dev_secret_key_change_later";

app.use(cors({ origin: "*" }));
app.use(express.json());

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.json({ status: "LeadRevive LIVE" });
});

// =====================
// LOGIN (FIXED)
// =====================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Missing credentials" });
    }

    // DEMO AUTH RULE
    if (password !== "password123") {
      return res.status(401).json({ error: "Invalid password" });
    }

    const user = {
      id: "test123",
      email,
      isPaid: false,
      plan: "free",
    };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

    return res.json({ token, user });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
});

// =====================
// CREATE CHECKOUT SESSION
// =====================
// (unchanged - keep your existing Stripe code)

// =====================
// LEADS (UNCHANGED)
// =====================

// =====================
// START SERVER (IMPORTANT)
// =====================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});