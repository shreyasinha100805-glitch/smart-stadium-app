"use client";

import Link from "next/link";
import { ArrowLeft, Rss } from "lucide-react";

const updates = [
  { title: "Stadium gates now open", time: "5 min ago", detail: "Fans are entering through Gate B4 and C2." },
  { title: "Halftime snack deals", time: "12 min ago", detail: "Buy one get one free on select snacks at the South Concourse." },
  { title: "Weather alert", time: "20 min ago", detail: "Light rain expected in the second half. Grab a poncho." },
];

export default function MatchNews() {
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
            <p className="text-sm text-yellow-600 font-semibold">Match News</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Live updates</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-yellow-50 px-4 py-3 text-sm font-semibold text-yellow-700 shadow-sm">
            <Rss size={18} /> Updated now
          </div>
        </div>

        <div className="space-y-4">
          {updates.map((item) => (
            <div key={item.title} className="rounded-3xl bg-slate-50 p-5 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                </div>
                <span className="text-sm text-gray-400">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
