"use client";

import React, { useEffect, useState } from "react";

export default function SubscriptionStatus() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      // TODO: Replace with real API call
      setStatus("Active");
    }
    fetchStatus();
  }, []);

  if (!status) {
    return <p>Loading subscription status...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Subscription Status</h2>
      <p>{status}</p>
    </div>
  );
}
