"use client";

import React, { useState } from "react";

const subscriptionOptions = [
  { label: "Trial (7 days)", value: "TRIAL", durationDays: 7, hasVps: false },
  { label: "Regular (30 days)", value: "REGULAR", durationDays: 30, hasVps: true },
  { label: "Premium (90 days)", value: "PREMIUM", durationDays: 90, hasVps: true },
];

export default function RegisterPagePart1() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreedToDocuments: false,
    mobileNumber: "",
    idCardUrl: "",
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
}
