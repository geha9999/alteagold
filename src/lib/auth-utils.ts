import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export async function requireAuth(req: NextApiRequest, res: NextApiResponse, role?: string) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }
  if (role && (session.user as any)?.role !== role) {
    res.status(403).json({ message: "Forbidden" });
    return null;
  }
  return session;
}
