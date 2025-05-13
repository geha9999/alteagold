"use client";

import React, { useState } from "react";

const subscriptionOptions = [
  { label: "Trial (7 days)", value: "TRIAL", durationDays: 7, hasVps: false },
  { label: "Regular (30 days)", value: "REGULAR", durationDays: 30, hasVps: true },
  { label: "Premium (90 days)", value: "PREMIUM", durationDays: 90, hasVps: true },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreedToDocuments: false,
    mt5Account: {
      brokerName: "",
      serverName: "",
      accountId: "",
      passcode: "",
      asset: "GOLD",
      minDeposit: 5000,
      isDemo: false,
    },
    subscription: {
      type: "TRIAL",
      durationDays: 7,
      hasVps: false,
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    if (name.startsWith("mt5Account.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        mt5Account: {
          ...prev.mt5Account,
          [key]: type === "checkbox" ? checked : value,
        },
      }));
    } else if (name.startsWith("subscription.")) {
      const key = name.split(".")[1];
      let val: any = value;
      if (key === "type") {
        const option = subscriptionOptions.find((opt) => opt.value === value);
        if (option) {
          setFormData((prev) => ({
            ...prev,
            subscription: {
              type: option.value,
              durationDays: option.durationDays,
              hasVps: option.hasVps,
            },
          }));
          return;
        }
      }
      setFormData((prev) => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          [key]: val,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }
      setSuccessMessage("Registration successful! Please check your email for further instructions.");
      setLoading(false);
      setStep(4);
    } catch (err) {
      setError("Unexpected error");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded-md shadow-md mt-12">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!formData.name || !formData.email || !formData.password) {
              setError("Please fill all required fields");
              return;
            }
            setError(null);
            setStep(2);
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="py-3 px-6 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Next
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!formData.agreedToDocuments) {
              setError("You must agree to the documents to continue");
              return;
            }
            setError(null);
            setStep(3);
          }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold mb-4">Documents Agreement</h2>
          <p className="mb-4">
            Please read and agree to the following documents before continuing:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Risk Disclosure</li>
          </ul>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="agreedToDocuments"
              checked={formData.agreedToDocuments}
              onChange={handleChange}
              className="mr-2"
              required
            />
            I have read and agree to the documents
          </label>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mr-4 py-2 px-4 border border-gray-300 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Next
            </button>
          </div>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">MT5 Account & Subscription</h2>
          <div>
            <label htmlFor="brokerName" className="block font-semibold mb-1">
              Broker Name
            </label>
            <input
              id="brokerName"
              name="mt5Account.brokerName"
              type="text"
              value={formData.mt5Account.brokerName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="serverName" className="block font-semibold mb-1">
              Server Name
            </label>
            <input
              id="serverName"
              name="mt5Account.serverName"
              type="text"
              value={formData.mt5Account.serverName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="accountId" className="block font-semibold mb-1">
              Account ID
            </label>
            <input
              id="accountId"
              name="mt5Account.accountId"
              type="text"
              value={formData.mt5Account.accountId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="passcode" className="block font-semibold mb-1">
              Account Passcode
            </label>
            <input
              id="passcode"
              name="mt5Account.passcode"
              type="password"
              value={formData.mt5Account.passcode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="asset" className="block font-semibold mb-1">
              Asset
            </label>
            <select
              id="asset"
              name="mt5Account.asset"
              value={formData.mt5Account.asset}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="GOLD">Gold</option>
              <option value="BITCOIN">Bitcoin</option>
            </select>
          </div>
          <div>
            <label htmlFor="minDeposit" className="block font-semibold mb-1">
              Minimum Deposit ($)
            </label>
            <input
              id="minDeposit"
              name="mt5Account.minDeposit"
              type="number"
              min={5000}
              value={formData.mt5Account.minDeposit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="mt5Account.isDemo"
                checked={formData.mt5Account.isDemo}
                onChange={handleChange}
                className="mr-2"
              />
              Demo Account
            </label>
          </div>
          <div>
            <label htmlFor="subscriptionType" className="block font-semibold mb-1">
              Subscription Type
            </label>
            <select
              id="subscriptionType"
              name="subscription.type"
              value={formData.subscription.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              {subscriptionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      )}

      {step === 4 && successMessage && (
        <div className="p-6 bg-green-100 text-green-800 rounded">
          <h2 className="text-xl font-semibold mb-4">Success</h2>
          <p>{successMessage}</p>
          <p className="mt-4">
            You can now <a href="/auth/signin" className="underline text-blue-600">sign in</a>.
          </p>
        </div>
      )}
    </div>
  );
}
