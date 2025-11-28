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

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setEligible(data.eligible);
    } catch (err) {
      console.error(err);
      setEligible(false);
    } finally {
      setLoading(false);
    }
  };

  const shareBadge = () => {
    const url = `${window.location.origin}/og?handle=${handle}`;
    const text = `Check out my Miden OG Badge!`;
    const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitter, "_blank");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        backgroundImage: "url('/miden.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          Miden OG Badge Checker
        </h1>

        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="@handle"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none"
        />

        <button
          onClick={checkEligibility}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Eligibility"}
        </button>

        {eligible !== null && (
          <div className="mt-8">
            {eligible ? (
              <>
                <p className="text-green-400 text-xl font-bold mb-4">
                  ✓ Eligible for Miden OG Badge
                </p>
                <img
                  src={`/og?handle=${handle}&t=${Date.now()}`}
                  alt="OG Badge"
                  className="rounded-xl border border-white/20 shadow-lg mx-auto"
                />

                <button
                  onClick={shareBadge}
                  className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-white"
                >
                  Share on Twitter
                </button>
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
