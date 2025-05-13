"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpRequired, setTotpRequired] = useState(false);
  const [totpToken, setTotpToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!totpRequired) {
      // First step: sign in with credentials
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
        return;
      }

      // Check if 2FA is required (simulate by checking response or call API)
      // For demo, assume 2FA required if email contains "2fa"
      if (email.includes("2fa")) {
        setTotpRequired(true);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } else {
      // Second step: verify TOTP token
      try {
        const res = await fetch("/api/auth/totp-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token: totpToken }),
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Invalid TOTP token");
          setLoading(false);
          return;
        }
        router.push("/dashboard");
      } catch (err) {
        setError("Unexpected error");
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white text-black rounded-md shadow-md mt-12">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!totpRequired ? (
          <>
            <div>
              <label htmlFor="email" className="block mb-1 font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="totp" className="block mb-1 font-semibold">
              Enter 2FA Code
            </label>
            <input
              id="totp"
              type="text"
              maxLength={6}
              value={totpToken}
              onChange={(e) => setTotpToken(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          {loading ? "Signing in..." : totpRequired ? "Verify 2FA" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
