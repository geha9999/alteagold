"use client";

import React, { useState } from "react";

export default function SubscriptionCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe() {
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual price ID from Stripe dashboard
      const priceId = "price_1234567890abcdef";

      const res = await fetch("/api/subscription/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          successUrl: window.location.origin + "/dashboard",
          cancelUrl: window.location.origin + "/dashboard",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to create checkout session");
        setLoading(false);
        return;
      }

      const { sessionId } = await res.json();

      const stripeJs = await import("@stripe/stripe-js");
      const stripe = await stripeJs.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

      if (!stripe) {
        setError("Stripe.js failed to load");
        setLoading(false);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        setError(error.message || "Stripe checkout error");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        {loading ? "Processing..." : "Subscribe Now"}
      </button>
    </div>
  );
}
