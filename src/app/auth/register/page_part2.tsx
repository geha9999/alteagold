"use client";

import React from "react";

export default function RegisterPagePart2({
  formData,
  setFormData,
  step,
  setStep,
  error,
  setError,
  handleChange,
}: {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <>
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
    </>
  );
}
