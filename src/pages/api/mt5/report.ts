import { NextApiRequest, NextApiResponse } from "next";

// Dummy in-memory store for reports; replace with DB in production
const reports: Record<string, any[]> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { apiKey, report } = req.body;

  if (!apiKey || !report) {
    return res.status(400).json({ message: "Missing apiKey or report" });
  }

  // Simple API key check; replace with real auth in production
  if (apiKey !== "example-api-key-123") {
    return res.status(401).json({ message: "Invalid apiKey" });
  }

  if (!reports[apiKey]) {
    reports[apiKey] = [];
  }

  reports[apiKey].push(report);

  return res.status(200).json({ message: "Report received" });
}
