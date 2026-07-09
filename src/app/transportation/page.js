"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bus, Car, Zap, MapPin, TrendingDown } from "lucide-react";

export default function TransportationPage() {
  const router = useRouter();

  const options = [
    {
      icon: Bus,
      title: "Public Transit",
      desc: "Bus line 42 arrives every 15 min. Metro station 0.5km away (10 min walk).",
      details: ["Discounted fares for ticket holders", "Easy transfers", "Real-time tracking available"],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Car,
      title: "Parking & Ride Share",
      desc: "5,000 parking spots available. Uber/Lyft pickup at North Lot.",
      details: ["Reserved disabled parking", "EV charging stations", "Attendant-assisted parking"],
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Zap,
      title: "EV Charging",
      desc: "200+ Tesla/EV chargers. Free charging during event.",
      details: ["Fast chargers (30 min full)", "Solar-powered grid", "App-based reservations"],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: MapPin,
      title: "Shuttle Service",
      desc: "Park & Ride 5km away. Shuttles run every 10 minutes.",
      details: ["Free for ticket holders", "Accessible buses available", "WiFi on board"],
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const crowdLevel = [
    { route: "Bus Line 42", load: 65, status: "Comfortable" },
    { route: "Metro Line A", load: 78, status: "Busy" },
    { route: "Park & Ride Shuttle", load: 40, status: "Light" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-100">
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
          🚌 Smart Transportation
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Multiple eco-friendly options to get you to the stadium safely and comfortably. Real-time traffic and
          crowd data included.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.title} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${option.color}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
                    <ul className="mt-3 space-y-1">
                      {option.details.map((detail) => (
                        <li key={detail} className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="text-blue-600">✓</span> {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Current Transit Load</h2>
          <div className="space-y-4">
            {crowdLevel.map((transit) => (
              <div key={transit.route} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{transit.route}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        transit.load > 70
                          ? "bg-red-500"
                          : transit.load > 50
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${transit.load}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-gray-900">{transit.load}%</p>
                  <p className="text-xs text-gray-500">{transit.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-4">🌍 Environmental Impact</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm opacity-90">Avg Carbon/Trip</p>
              <p className="text-2xl font-bold">2.5kg</p>
              <p className="text-xs opacity-75">Driving alone</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Public Transit</p>
              <p className="text-2xl font-bold">0.3kg</p>
              <p className="text-xs opacity-75">87% less emissions</p>
            </div>
            <div>
              <p className="text-sm opacity-90">EV Charging</p>
              <p className="text-2xl font-bold">0kg</p>
              <p className="text-xs opacity-75">100% renewable</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Travel Tips</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>Arrive 90 minutes early for smooth parking and entry</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>Use Park & Ride for stress-free experience and guaranteed parking</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>Public transit recommended during peak traffic (3-6pm)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">→</span>
              <span>Download our app for real-time transit tracking</span>
            </li>
          </ul>
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
