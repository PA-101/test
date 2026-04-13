import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

const JWT_SECRET = "dev_secret_key";

app.use(cors({ origin: "*" }));
app.use(express.json());

// HEALTH
app.get("/", (req, res) => {
  res.json({ status: "LIVE" });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (password !== "password123") {
    return res.status(401).json({ error: "Wrong password" });
  }

  const user = {
    id: "test123",
    email,
    isPaid: false,
  };

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });

  res.json({ token, user });
});

const PORT = 10000;

app.listen(PORT, () => {
  console.log("Backend running on", PORT);
});