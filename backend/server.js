import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// TEMP IN-MEMORY DATABASE (we upgrade later)
let leads = [];

/**
 * CREATE LEAD EVENT (THIS IS YOUR CORE PRODUCT)
 */
app.post("/api/lead", (req, res) => {
  const { phone, userId } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone required" });
  }

  const event = {
    id: Date.now(),
    userId,
    phone,
    events: [
      `📞 Missed call from ${phone}`,
      `💬 SMS sent to ${phone}`,
      `✅ Customer replied and booked`,
    ],
    createdAt: new Date(),
  };

  leads.push(event);

  return res.json(event);
});

/**
 * GET USER LEADS (DASHBOARD FEED)
 */
app.get("/api/leads/:userId", (req, res) => {
  const userLeads = leads.filter(l => l.userId === req.params.userId);
  res.json(userLeads);
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("LeadRevive Engine running on port", PORT);
});