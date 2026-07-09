"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Accessibility, Smartphone, Navigation, Users, MapPin } from "lucide-react";

export default function AccessibilityPage() {
  const router = useRouter();

  const features = [
    {
      icon: Accessibility,
      title: "Physical Access",
      desc: "Wheelchair seating, accessible parking, ramps, and elevators throughout the stadium.",
    },
    {
      icon: Smartphone,
      title: "Digital Access",
      desc: "Mobile app with screen reader support, voice controls, and accessible ticketing.",
    },
    {
      icon: Navigation,
      title: "Navigation Support",
      desc: "Step-by-step directions, tactile maps, and staff assistance available.",
    },
    {
      icon: Users,
      title: "Service Animals",
      desc: "Service dogs welcome. Designated relief areas and water stations provided.",
    },
    {
      icon: MapPin,
      title: "Quiet Spaces",
      desc: "Sensory-friendly rooms available for guests who need breaks from crowds.",
    },
  ];

  const services = [
    "Live ASL interpretation at all gates",
    "CART captions on main screens",
    "Audio descriptions of match events",
    "Real-time crowd density alerts",
    "Accessible restroom locations",
    "Dedicated accessible entrances",
    "Priority parking in Lot A",
    "Companion seat discounts",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="px-4 sm:px-6 py-6 sticky top-0 z-10 bg-white/70 backdrop-blur-md shadow-sm">
        <button
          onClick={() => router.back()}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          ← Back
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          ♿ Accessibility First
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          We're committed to making the stadium experience inclusive for everyone. All fans deserve
          equal access to the match.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <feature.icon className="text-indigo-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Available Services</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                <span className="text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📞 Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our accessibility team is here to support you. Contact us before your visit to arrange
            accommodations.
          </p>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Phone:</span> +1-555-STADIUM ext. 2500
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Email:</span> access@stadium.com
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Available:</span> 24 hours during events
            </p>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
