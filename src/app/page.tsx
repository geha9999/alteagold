"use client";

import React, { useState, useEffect } from "react";
import ContentEditor from "../components/ContentEditor";
import { useSession } from "next-auth/react";

const defaultContent = {
  heading: "Expert Algorithmic Trading SaaS",
  description:
    "Manage your subscription to the expert algorithmic trading system with ease and security.",
  button1Text: "Get Started",
  button2Text: "Learn More",
  imageUrl: null,
};

export default function HomePage() {
  const { data: session } = useSession();
  const [content, setContent] = useState(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedContent = localStorage.getItem("landingPageContent");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  if (isAdmin) {
    return (
      <div className="p-8 bg-white text-black min-h-screen">
        <button
          onClick={() => setIsAdmin(false)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back to Home
        </button>
        <ContentEditor />
      </div>
    );
  }

  const isUserAdmin = session?.user && (session.user as any).role === "admin";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-white text-black">
      {content.imageUrl && (
        <img
          src={content.imageUrl}
          alt="Landing"
          className="mb-6 max-h-64 object-contain rounded"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{content.heading}</h1>
      <p className="text-lg max-w-xl text-center mb-8">{content.description}</p>
      <div className="space-x-4">
        <a
          href="/auth"
          className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
        >
          {content.button1Text}
        </a>
        <a
          href="/#learn-more"
          className="inline-block px-6 py-3 border border-black rounded-md hover:bg-gray-100 transition"
        >
          {content.button2Text}
        </a>
      </div>
      {isUserAdmin && (
        <button
          onClick={() => setIsAdmin(true)}
          className="mt-12 underline text-sm text-gray-600"
        >
          Admin Menu
        </button>
      )}
    </main>
  );
}
