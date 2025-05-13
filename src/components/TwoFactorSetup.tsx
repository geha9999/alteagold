"use client";

import React, { useState, useEffect } from "react";

export default function TwoFactorSetup() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSetup() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/auth/totp-setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: "user@example.com" }), // Replace with actual user email from session
        });
        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Failed to fetch TOTP setup");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setQrCodeUrl(data.qrCodeDataUrl);
        setSecret(data.secret);
        setLoading(false);
      } catch (err) {
        setError("Unexpected error");
        setLoading(false);
      }
    }
    fetchSetup();
  }, []);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/totp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "user@example.com", token }), // Replace with actual user email
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Verification failed");
        setLoading(false);
        return;
      }
      setMessage("Two-factor authentication setup successfully!");
      setLoading(false);
    } catch (err) {
      setError("Unexpected error");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white text-black rounded-md shadow-md mt-12">
      <h2 className="text-xl font-bold mb-4">Two-Factor Authentication Setup</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {qrCodeUrl && (
        <div className="mb-4">
          <p>Scan this QR code with your authenticator app:</p>
          <img src={qrCodeUrl} alt="TOTP QR Code" className="mx-auto" />
        </div>
      )}
      <form onSubmit={handleVerify} className="space-y-4">
        <label htmlFor="token" className="block font-semibold">
          Enter the 6-digit code from your authenticator app
        </label>
        <input
          id="token"
          type="text"
          maxLength={6}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Verify
        </button>
      </form>
    </div>
  );
}
