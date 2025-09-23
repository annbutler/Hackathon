"use client";
import { useState } from "react";

export default function Artficialintel() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.text || "No response");
    } catch {
      setResponse("Error generating response.");
    }
    setLoading(false);
  }

  return (
    <main className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-lg mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2">
          <span>Gemini AI Playground</span>
          <span className="text-2xl">🚀</span>
        </h1>
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
        >
          How to get a Gemini API Key?
        </a>
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Enter your prompt
        </label>
        <textarea
          className="w-full p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 transition mb-2 resize-none"
          rows={4}
          placeholder="Ask Gemini something creative, technical, or fun..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <button
            onClick={handleGenerate}
            disabled={!prompt || loading}
            className={`px-6 py-2 rounded-lg font-bold transition ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500"
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
          <a
            href="https://aistudio.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 underline ml-2"
          >
            Visit Gemini AI Studio
          </a>
        </div>
      </div>

      {response && (
        <div className="mt-8 p-6 border-2 border-blue-100 rounded-xl bg-blue-50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <strong className="text-blue-700">Gemini says:</strong>
            <span className="text-blue-400">🤖</span>
          </div>
          <p className="text-gray-800 whitespace-pre-line">{response}</p>
        </div>
      )}

      <div className="mt-10 text-sm text-gray-500 text-center">
        Need help?{" "}
        <a
          href="https://aistudio.google.com/app/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Learn how to generate an API key
        </a>
      </div>
    </main>
  );
}
