"use client";

import React from "react";

export default function RegisterPagePart4({
  formData,
  setFormData,
  step,
  setStep,
  error,
  loading,
  successMessage,
  handleChange,
  handleFileChange,
  handleSubmit,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  error: string | null;
  loading: boolean;
  successMessage: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <>
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
            <label htmlFor="mobileNumber" className="block font-semibold mb-1">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="idCard" className="block font-semibold mb-1">
              Upload ID Card
            </label>
            <input
              id="idCard"
              name="idCard"
              type="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {formData.idCardUrl && (
              <p className="mt-2 text-sm text-gray-600">File ready for upload</p>
            )}
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
    </>
  );
}
