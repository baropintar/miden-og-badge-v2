"use client";

import { useState } from "react";

export default function Home() {
  const [handle, setHandle] = useState("");
  const [eligible, setEligible] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const checkEligibility = async () => {
    if (!handle.trim()) return;

    setLoading(true);
    setEligible(null);

    const res = await fetch("/og", {
      method: "POST",
      body: JSON.stringify({ handle }),
    });

    const data = await res.json();
    setEligible(data.eligible);
    setLoading(false);
  };

  const ogUrl = `${window.location.origin}/og?handle=${handle}&t=${Date.now()}`;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        backgroundImage: "url('/miden.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* GLASS CARD */}
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Miden OG Badge Checker
        </h1>

        {/* INPUT */}
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="@handle"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={checkEligibility}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Eligibility"}
        </button>

        {/* RESULT */}
        {eligible !== null && (
          <div className="mt-8">
            {eligible ? (
              <>
                <p className="text-green-400 text-xl font-bold mb-4">
                  ✓ Eligible for Miden OG Badge
                </p>

                {/* BADGE PREVIEW */}
                <img
                  src={ogUrl}
                  alt="OG Badge"
                  className="rounded-xl border border-white/20 shadow-lg mx-auto"
                />

                {/* SHARE BUTTONS */}
                <div className="flex gap-3 mt-4 justify-center flex-wrap">
                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(ogUrl);
                      alert("Link badge copied!");
                    }}
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold transition"
                  >
                    Copy Link
                  </button>

                  {/* Twitter Share */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=Check out my Miden OG Badge!&url=${encodeURIComponent(
                      ogUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
                  >
                    Share Twitter
                  </a>

                  {/* Discord Share */}
                  <a
                    href={`https://discord.com/channels/@me`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
                  >
                    Share Discord
                  </a>
                </div>
              </>
            ) : (
              <p className="text-red-400 text-xl font-bold">✗ Not Eligible</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
