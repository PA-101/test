import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();

app.use(cors());
app.use(express.json());

// =====================
// HEALTH CHECK
// =====================
app.get("/", (req, res) => {
  res.json({ status: "LeadRevive EMAIL ENGINE LIVE" });
});

// =====================
// EMAIL TRANSPORT (DEV MODE)
// =====================
// NOTE: uses Gmail SMTP (you must add env vars later for production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// =====================
// SEND DEMO EMAIL
// =====================
app.post("/api/send-demo-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  try {
    await transporter.sendMail({
      from: `"LeadRevive AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your AI Agent Just Activated 🚀",
      text: `
Hey!

Your AI outreach agent just simulated a real automation flow:

✔ Lead detected  
✔ Follow-up initiated  
✔ Message sequence prepared  

This is exactly what your system will do automatically once unlocked.

👉 Upgrade to unlock full automation
👉 Remove limits
👉 Launch campaigns instantly

LeadRevive AI
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Email failed to send" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});