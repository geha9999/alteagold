"use client";

import React from "react";

export default function RegisterPagePart3({
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
    </>
  );
}
