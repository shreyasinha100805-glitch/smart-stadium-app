"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BarChart3, AlertTriangle, TrendingUp, Users, Clock } from "lucide-react";

export default function OperationsPage() {
  const router = useRouter();

  const metrics = [
    {
      label: "Stadium Capacity",
      value: "78%",
      change: "+5% from 1hr ago",
      trend: "up",
      icon: Users,
    },
    {
      label: "Exit Flow Rate",
      value: "2,400/min",
      change: "Normal operations",
      trend: "stable",
      icon: TrendingUp,
    },
    {
      label: "Avg Wait Times",
      value: "8.2 min",
      change: "-2.1 min vs last match",
      trend: "down",
      icon: Clock,
    },
    {
      label: "Critical Alerts",
      value: "1",
      change: "East gate congestion",
      trend: "warning",
      icon: AlertTriangle,
    },
  ];

  const crowdHotspots = [
    {
      location: "North Concourse",
      density: 95,
      recommendation: "Redirect foot traffic to South Concourse",
    },
    {
      location: "Beer Garden",
      density: 78,
      recommendation: "Add temporary staff, extend to overflow area",
    },
    {
      location: "Merch Stand",
      density: 65,
      recommendation: "Monitor; consider opening second location",
    },
    {
      location: "South Concourse",
      density: 42,
      recommendation: "Under-utilized; promote for crowd balance",
    },
  ];

  const realTimeRecs = [
    "🚪 East gate experiencing 15% higher than avg exit flow. Recommend opening additional scanners.",
    "🍕 Pizza stand queue doubled in last 5 min. Deploy 2 additional staff.",
    "👥 North section reaching comfort capacity. Suggest opening overflow seating.",
    "⏱️ Q3 halftime peak estimated in 8 minutes. Prepare food service scaling.",
    "🚑 Medical team responded to minor incident. All OK. No action needed.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-gray-100">
      <div className="px-4 sm:px-6 py-6 sticky top-0 z-10 bg-white/70 backdrop-blur-md shadow-sm">
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          📊 Operational Intelligence
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Real-time analytics for venue management, crowd control, and decision support. Data updates every 30
          seconds.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const bgColor =
              metric.trend === "warning"
                ? "bg-amber-50 border-amber-200"
                : "bg-blue-50 border-blue-200";
            return (
              <div key={metric.label} className={`rounded-2xl p-6 shadow-md border ${bgColor}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    <p className="text-xs text-gray-500 mt-2">{metric.change}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 size={28} /> Crowd Hotspots & Recommendations
          </h2>
          <div className="space-y-3">
            {crowdHotspots.map((spot) => (
              <div key={spot.location} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-end justify-between mb-2">
                  <p className="font-semibold text-gray-900">{spot.location}</p>
                  <span className="text-sm font-bold text-gray-600">Density: {spot.density}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full ${
                      spot.density > 80
                        ? "bg-red-500"
                        : spot.density > 60
                        ? "bg-amber-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${spot.density}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">💡 {spot.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚡ Real-Time Recommendations</h2>
          <ul className="space-y-3">
            {realTimeRecs.map((rec, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4">
                <span className="text-lg mt-1">{rec.split(" ")[0]}</span>
                <span className="text-gray-700">{rec.substring(rec.indexOf(" ") + 1)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🎯 For Operations Team</h2>
          <p className="mb-6">
            Advanced analytics dashboard with machine learning predictions for crowd flow, resource allocation,
            and incident prevention.
          </p>
          <a
            href="mailto:ops@stadium.com"
            className="inline-flex items-center justify-center rounded-xl bg-white text-blue-600 px-6 py-2 font-semibold hover:bg-gray-100 transition"
          >
            Access Full Dashboard
          </a>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
