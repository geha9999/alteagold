import { NextApiRequest, NextApiResponse } from "next";

// Dummy API key store for demonstration; replace with real DB or secret management
const validApiKeys = new Set([
  "example-api-key-123",
]);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ message: "Missing apiKey" });
  }

  if (!validApiKeys.has(apiKey)) {
    return res.status(401).json({ message: "Invalid apiKey" });
  }

  // Authentication successful
  return res.status(200).json({ message: "Authenticated" });
}
