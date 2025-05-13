"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // For simplicity, just sign in with credentials provider using email only
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password: "dummy-password", // Passwordless or magic link not implemented, so dummy password
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  async function handleGoogleSignIn() {
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white text-black rounded-md shadow-md mt-12">
      <h1 className="text-2xl font-bold mb-6">Sign in to Expert Algorithmic Trading SaaS</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">{error}</div>
      )}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleGoogleSignIn}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Connect using Google
        </button>
      </div>
      <form onSubmit={handleContinue} className="space-y-4">
        <label htmlFor="email" className="block mb-1 font-semibold">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {loading ? "Continue..." : "Continue"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/auth" className="text-blue-600 underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
