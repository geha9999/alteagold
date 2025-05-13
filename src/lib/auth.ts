import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";

import { authenticator } from "otplib";

// Dummy user store for demonstration; replace with real DB in production
const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    passwordHash: "$2b$10$7Q9Q1vQ6vQ1vQ6vQ1vQ6vOQ1vQ6vQ1vQ6vQ1vQ6vQ1vQ6vQ1vQ6vQ", // bcrypt hash for "password123"
    role: "admin",
    twoFactorEnabled: true,
    twoFactorSecret: authenticator.generateSecret(),
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = users.find((u) => u.email === credentials.email);
        if (!user) return null;
        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          twoFactorEnabled: user.twoFactorEnabled || false,
          twoFactorSecret: user.twoFactorSecret || null,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: User }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
