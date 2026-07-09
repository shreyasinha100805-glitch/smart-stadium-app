"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Zap, DropletIcon, Recycle, TrendingDown } from "lucide-react";

export default function SustainabilityPage() {
  const router = useRouter();

  const initiatives = [
    {
      icon: Leaf,
      title: "Carbon Neutral",
      desc: "Offset 100% of stadium operations with renewable energy credits and tree planting programs.",
      impact: "2,500 trees planted this year",
    },
    {
      icon: Zap,
      title: "Renewable Energy",
      desc: "Stadium powered by 85% solar panels and wind turbines. Battery storage for night events.",
      impact: "1.2 MW renewable capacity",
    },
    {
      icon: DropletIcon,
      title: "Water Conservation",
      desc: "Rainwater harvesting, recycled irrigation, and low-flow fixtures throughout.",
      impact: "40% water reduction",
    },
    {
      icon: Recycle,
      title: "Zero Waste",
      desc: "100% recyclable materials, composting programs, and minimal single-use plastics.",
      impact: "95% waste diverted from landfills",
    },
    {
      icon: TrendingDown,
      title: "Reduce Carbon",
      desc: "Use digital tickets, take public transit, and join our carbon offset program.",
      impact: "Average visitor: 2.5kg CO2 per visit",
    },
  ];

  const fanActions = [
    {
      action: "Digital Ticket",
      carbon: "-0.5kg",
      description: "Skip printing. Use mobile entry instead.",
    },
    {
      action: "Public Transit",
      carbon: "-1.2kg",
      description: "Take bus/metro instead of driving.",
    },
    {
      action: "Reusable Cup",
      carbon: "-0.3kg",
      description: "Get 10% discount + save plastic.",
    },
    {
      action: "Carpool",
      carbon: "-0.8kg",
      description: "Share a ride with other fans.",
    },
    {
      action: "Eco Merchandise",
      carbon: "-0.2kg",
      description: "Sustainable team gear made from recycled materials.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      <div className="px-4 sm:px-6 py-6 sticky top-0 z-10 bg-white/70 backdrop-blur-md shadow-sm">
        <button
          onClick={() => router.back()}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🌱 Sustainability Commitment
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          We're building a greener future for stadium operations. Every action counts toward our net-zero
          carbon goal by 2030.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {initiatives.map((initiative) => (
            <div key={initiative.title} className="bg-white rounded-2xl p-6 shadow-md border border-emerald-200">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <initiative.icon className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{initiative.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{initiative.desc}</p>
                  <p className="text-xs font-semibold text-emerald-600 mt-2">{initiative.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">♻️ Reduce Your Carbon Footprint</h2>
          <div className="space-y-3">
            {fanActions.map((item) => (
              <div
                key={item.action}
                className="flex items-center justify-between bg-white rounded-xl p-4 border border-emerald-100"
              >
                <div>
                  <p className="font-semibold text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <span className="text-lg font-bold text-emerald-600">{item.carbon}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 2026 Stadium Impact</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-600">Annual Carbon Emissions</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">1,200 tonnes</p>
              <p className="text-xs text-gray-500 mt-1">Target: 0 tonnes (net-zero)</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Renewable Energy Used</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">85%</p>
              <p className="text-xs text-gray-500 mt-1">Increasing to 100% by 2030</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-emerald-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
