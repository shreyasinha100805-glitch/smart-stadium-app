"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Coffee, Pizza, IceCream, Beer } from "lucide-react";

const initialStalls = [
  { name: "Concession Stand A", icon: Pizza, wait: 8 },
  { name: "Coffee Corner", icon: Coffee, wait: 3 },
  { name: "Ice Cream Booth", icon: IceCream, wait: 5 },
  { name: "Beer Garden", icon: Beer, wait: 12 },
];

export default function LiveQueue() {
  const [stalls, setStalls] = useState(initialStalls);

  useEffect(() => {
    const interval = setInterval(() => {
      setStalls((prev) =>
        prev.map((s) => ({
          ...s,
          wait: Math.max(1, s.wait + (Math.random() > 0.5 ? 1 : -1)),
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (wait) => {
    if (wait <= 5) return "text-green-600 bg-green-50";
    if (wait <= 10) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 w-fit"
      >
        <ArrowLeft size={18} /> Back
      </Link>

      <div className="max-w-lg mx-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Live Queue Times</h1>
        <p className="text-sm text-gray-500 mb-5">
          Updates automatically every few seconds
        </p>

        <div className="space-y-3">
          {stalls.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                  <s.icon size={20} />
                </div>
                <p className="font-medium text-gray-800">{s.name}</p>
              </div>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${getColor(
                  s.wait
                )}`}
              >
                {s.wait} min
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}