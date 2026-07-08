"use client";

import Link from "next/link";
import { ArrowLeft, Car } from "lucide-react";

const spots = [
  { name: "Lot A", status: "Available", spots: 24, color: "text-emerald-600 bg-emerald-50" },
  { name: "Lot B", status: "Filling", spots: 7, color: "text-orange-600 bg-orange-50" },
  { name: "Lot C", status: "Full", spots: 0, color: "text-red-600 bg-red-50" },
];

export default function Parking() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 w-fit"
      >
        <ArrowLeft size={18} /> Back
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-cyan-600 font-semibold">Parking</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Find your spot fast</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700 shadow-sm">
            <Car size={18} /> Updated live
          </div>
        </div>

        <div className="space-y-4">
          {spots.map((lot) => (
            <div key={lot.name} className="rounded-3xl border border-gray-100 bg-gray-50 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">{lot.name}</p>
                  <h2 className="text-xl font-semibold text-gray-900 mt-1">{lot.status}</h2>
                </div>
                <div className={`inline-flex items-center rounded-2xl px-3 py-2 text-sm font-semibold ${lot.color}`}>
                  {lot.spots} spots
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                {lot.status === "Full"
                  ? "Try Lot A or B for the next closest available parking."
                  : "Reserve a nearby space and walk to your gate quickly."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
