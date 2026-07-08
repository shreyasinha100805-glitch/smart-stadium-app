"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Ticket,
  MapPin,
  Clock,
  LogOut,
  User,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Newspaper,
  Utensils,
  ParkingSquare,
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else router.push("/");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const notifications = [
    { text: "Gates open in 45 minutes", time: "2m ago" },
    { text: "Your section has light rain expected", time: "10m ago" },
    { text: "Beer Garden queue is now short", time: "20m ago" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-900"
      }`}
    >
      {/* Top bar */}
      <div
        className={`flex items-center justify-between px-4 sm:px-6 py-4 backdrop-blur-md shadow-sm sticky top-0 z-20 transition-colors duration-500 ${
          darkMode ? "bg-white/5" : "bg-white/70"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg shrink-0">
            🏟️
          </div>
          <span className="font-bold hidden sm:inline">Smart Stadium</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-all duration-200 ${
              darkMode
                ? "bg-white/10 text-yellow-300 hover:bg-white/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifs(!showNotifs);
                setShowProfile(false);
              }}
              className={`relative p-2 rounded-full transition-all duration-200 ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {showNotifs && (
              <div
                className={`absolute right-0 mt-2 w-72 rounded-xl shadow-xl overflow-hidden border animate-[fadeIn_0.15s_ease-out] ${
                  darkMode
                    ? "bg-slate-800 border-white/10"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="p-3 border-b border-gray-100/10 font-semibold text-sm">
                  Notifications
                </div>
                {notifications.map((n, i) => (
                  <div
                    key={i}
                    className={`p-3 text-sm border-b last:border-0 ${
                      darkMode ? "border-white/5 hover:bg-white/5" : "border-gray-50 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <p>{n.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifs(false);
              }}
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-full transition-all duration-200 ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <User size={13} className="text-white" />
              </div>
              <span className="text-sm hidden md:inline max-w-[140px] truncate">
                {user?.email}
              </span>
              <ChevronDown size={14} />
            </button>
            {showProfile && (
              <div
                className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden border ${
                  darkMode
                    ? "bg-slate-800 border-white/10"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="p-3 border-b border-gray-100/10">
                  <p className="text-sm font-medium truncate">{user?.email}</p>
                  <p className="text-xs text-gray-400">Fan Account</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div className="relative mx-4 sm:mx-6 mt-6 rounded-2xl overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 sm:px-10 py-10 sm:py-14 relative">
          <div className="absolute inset-0 opacity-10 text-8xl flex items-center justify-end pr-6 select-none">
            🏟️
          </div>
          <p className="text-indigo-100 text-sm font-medium">
            Challenge 4 · Match Day
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Welcome back, {user?.email?.split("@")[0]} 👋
          </h1>
          <p className="text-indigo-100 mt-2 max-w-md text-sm sm:text-base">
            Kickoff at 7:30 PM · Gate B4 · Section West
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 sm:px-6 py-8 max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Quick actions</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          <Link href="/ticket">
            <FeatureCard
              icon={<Ticket size={22} />}
              title="My Ticket"
              desc="QR code & seat info"
              color="from-blue-500 to-indigo-600"
              dark={darkMode}
            />
          </Link>
          <Link href="/map">
            <FeatureCard
              icon={<MapPin size={22} />}
              title="Stadium Map"
              desc="Seats, gates & restrooms"
              color="from-purple-500 to-pink-600"
              dark={darkMode}
            />
          </Link>
          <Link href="/queue">
            <FeatureCard
              icon={<Clock size={22} />}
              title="Live Queue"
              desc="Concession wait times"
              color="from-orange-500 to-red-500"
              dark={darkMode}
            />
          </Link>
          <FeatureCard
            icon={<Utensils size={22} />}
            title="Order Food"
            desc="Delivered to your seat"
            color="from-emerald-500 to-teal-600"
            dark={darkMode}
            comingSoon
          />
          <FeatureCard
            icon={<ParkingSquare size={22} />}
            title="Parking"
            desc="Check spot availability"
            color="from-cyan-500 to-blue-600"
            dark={darkMode}
            comingSoon
          />
          <FeatureCard
            icon={<Newspaper size={22} />}
            title="Match News"
            desc="Live updates & scores"
            color="from-yellow-500 to-orange-600"
            dark={darkMode}
            comingSoon
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, dark, comingSoon }) {
  return (
    <div
      className={`relative rounded-2xl p-4 sm:p-5 shadow-md transition-all duration-200 border cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
        dark
          ? "bg-white/5 border-white/10 hover:bg-white/10"
          : "bg-white border-gray-100"
      }`}
    >
      {comingSoon && (
        <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-400/20 text-gray-400">
          Soon
        </span>
      )}
      <div
        className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 transition-transform duration-200 group-hover:scale-110`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
      <p className={`text-xs sm:text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
        {desc}
      </p>
    </div>
  );
}