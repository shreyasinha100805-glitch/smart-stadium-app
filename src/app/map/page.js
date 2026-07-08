"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sections = [
  { id: "A", label: "North Stand", x: 140, y: 20, w: 220, h: 60, color: "#60a5fa" },
  { id: "B", label: "South Stand", x: 140, y: 300, w: 220, h: 60, color: "#818cf8" },
  { id: "C", label: "East Stand", x: 400, y: 100, w: 60, h: 180, color: "#c084fc" },
  { id: "D", label: "West Stand", x: 40, y: 100, w: 60, h: 180, color: "#f472b6" },
];

const points = [
  { label: "Gate B4 (You)", x: 250, y: 90, color: "#ef4444" },
  { label: "Restroom", x: 420, y: 150, color: "#22c55e" },
  { label: "Food Court", x: 90, y: 200, color: "#f59e0b" },
];

export default function StadiumMap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 w-fit"
      >
        <ArrowLeft size={18} /> Back
      </Link>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Stadium Map</h1>
        <p className="text-sm text-gray-500 mb-4">
          Tap a section to see details
        </p>

        <svg viewBox="0 0 500 400" className="w-full h-auto border rounded-xl bg-green-50">
          {/* Field */}
          <ellipse cx="250" cy="200" rx="130" ry="90" fill="#4ade80" opacity="0.5" />

          {sections.map((s) => (
            <rect
              key={s.id}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              fill={s.color}
              opacity={selected === s.id ? 1 : 0.7}
              rx={8}
              className="cursor-pointer transition-opacity"
              onClick={() => setSelected(s.id)}
            />
          ))}

          {sections.map((s) => (
            <text
              key={s.id + "-label"}
              x={s.x + s.w / 2}
              y={s.y + s.h / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fill="white"
              fontWeight="bold"
              className="pointer-events-none"
            >
              {s.label}
            </text>
          ))}

          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={p.y} r={7} fill={p.color} />
              <text
                x={p.x}
                y={p.y - 12}
                textAnchor="middle"
                fontSize="10"
                fill="#374151"
                fontWeight="600"
              >
                {p.label}
              </text>
            </g>
          ))}
        </svg>

        {selected && (
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="font-semibold text-gray-800">
              {sections.find((s) => s.id === selected)?.label}
            </p>
            <p className="text-sm text-gray-500">
              Nearest entrance: Gate B4 · Estimated walk: 3 min
            </p>
          </div>
        )}
      </div>
    </div>
  );
}