"use client";

import React from "react";
import TwoFactorSetup from "../../components/TwoFactorSetup";

export default function Settings() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded-md shadow-md mt-12">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
      <TwoFactorSetup />
    </div>
  );
}
