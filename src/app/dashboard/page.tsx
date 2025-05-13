"use client";

import React from "react";
import SubscriptionStatus from "./SubscriptionStatus";
import SubscriptionCheckout from "./SubscriptionCheckout";

export default function DashboardPage() {
  // Placeholder data for EA reports
  const eaReports = [
    { date: "2024-05-10", profit: 120.5, trades: 15 },
    { date: "2024-05-09", profit: -45.0, trades: 10 },
    { date: "2024-05-08", profit: 75.3, trades: 12 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-black rounded-md shadow-md mt-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <section className="mb-8">
        <SubscriptionStatus />
        <SubscriptionCheckout />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Expert Advisor Daily Reports</h2>
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Profit</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Trades</th>
            </tr>
          </thead>
          <tbody>
            {eaReports.map((report) => (
              <tr key={report.date}>
                <td className="border border-gray-300 px-4 py-2">{report.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">${report.profit.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">{report.trades}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
