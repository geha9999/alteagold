import { NextApiRequest, NextApiResponse } from "next";
import { authenticator } from "otplib";
import QRCode from "qrcode";

const userSecrets: Record<string, string> = {}; // In-memory store for demo, replace with DB in production

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Generate a TOTP secret for the user
  const secret = authenticator.generateSecret();

  // Store secret for user (replace with DB in real app)
  userSecrets[email] = secret;

  // Generate otpauth URL for QR code
  const otpauth = authenticator.keyuri(email, "ExpertAlgorithmicTradingSaaS", secret);

  // Generate QR code data URL
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(otpauth);
    res.status(200).json({ secret, qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
}
