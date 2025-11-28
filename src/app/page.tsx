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
        body: JSON.stringify({ handle }),
      });
      const data = await res.json();
      setEligible(data.eligible);
    } catch (e) {
      console.error(e);
      setEligible(false);
    } finally {
      setLoading(false);
    }
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

        {/* Input */}
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="@handle"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none"
        />

        {/* Button */}
        <button
          onClick={checkEligibility}
          disabled={loading}
          className="w-full mt-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 transition font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Eligibility"}
        </button>

        {/* Result */}
        {eligible !== null && (
          <div className="mt-8">
            {eligible ? (
              <>
                <p className="text-green-400 text-xl font-bold mb-4">
                  ✓ Eligible for Miden OG Badge
                </p>

                {/* OG Badge */}
                <img
                  src={`/og?handle=${handle}`}
                  alt="OG Badge"
                  className="rounded-xl border border-white/20 shadow-lg mx-auto"
                />
              </>
            ) : (
              <p className="text-red-400 text-xl font-bold">
                ✗ Not Eligible
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
