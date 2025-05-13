"use client";

import React, { useState, useEffect, ChangeEvent } from "react";

interface Content {
  heading: string;
  description: string;
  button1Text: string;
  button2Text: string;
  imageUrl: string | null;
}

const defaultContent: Content = {
  heading: "Expert Algorithmic Trading SaaS",
  description:
    "Manage your subscription to the expert algorithmic trading system with ease and security.",
  button1Text: "Get Started",
  button2Text: "Learn More",
  imageUrl: null,
};

export default function ContentEditor() {
  const [content, setContent] = useState<Content>(defaultContent);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("landingPageContent");
    if (savedContent) {
      const parsed = JSON.parse(savedContent);
      setContent(parsed);
      setImagePreview(parsed.imageUrl);
    }
  }, []);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setContent((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    localStorage.setItem("landingPageContent", JSON.stringify(content));
    alert("Content saved!");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Landing Page Content Editor</h2>
      <label className="block mb-2 font-semibold" htmlFor="heading">
        Heading
      </label>
      <input
        id="heading"
        name="heading"
        type="text"
        value={content.heading}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <label className="block mb-2 font-semibold" htmlFor="description">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={content.description}
        onChange={handleInputChange}
        rows={4}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <label className="block mb-2 font-semibold" htmlFor="button1Text">
        Button 1 Text
      </label>
      <input
        id="button1Text"
        name="button1Text"
        type="text"
        value={content.button1Text}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <label className="block mb-2 font-semibold" htmlFor="button2Text">
        Button 2 Text
      </label>
      <input
        id="button2Text"
        name="button2Text"
        type="text"
        value={content.button2Text}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <label className="block mb-2 font-semibold" htmlFor="imageUpload">
        Upload Image
      </label>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mb-4 max-h-48 object-contain border border-gray-300 rounded"
        />
      )}
      <button
        onClick={handleSave}
        className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        Save Content
      </button>
    </div>
  );
}
