import { NextApiRequest, NextApiResponse } from "next";
import { authenticator } from "otplib";

// In-memory store for demo, replace with DB in production
const userSecrets: Record<string, string> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ error: "Email and token are required" });
  }

  const secret = userSecrets[email];
  if (!secret) {
    return res.status(400).json({ error: "TOTP not set up for this user" });
  }

  const isValid = authenticator.check(token, secret);

  if (isValid) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ error: "Invalid token" });
  }
}
