"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "@/lib/authWrapper";
import { matchDate, formatCountdown } from "@/lib/countdown.mjs";
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
  Search,
  HelpCircle,
  Trophy,
  CloudRain,
  Users,
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [countdown, setCountdown] = useState("");
  const router = useRouter();

  const homeTeam = "Stadium Tigers";
  const awayTeam = "City Falcons";

  useEffect(() => {
    const updateCountdown = () => {
      const diff = matchDate.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown("Kickoff now");
        return;
      }
      setCountdown(formatCountdown(diff));
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        return;
      }

      setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="spinner-smooth" aria-hidden="true" />
      </div>
    );
  }

  const notifications = [
    { text: "Gates open in 45 minutes", time: "2m ago", type: "success", icon: CheckCircle2 },
    { text: "Your section has light rain expected", time: "10m ago", type: "alert", icon: AlertTriangle },
    { text: "Beer Garden queue is now short", time: "20m ago", type: "info", icon: Info },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-900"
      }`}
      style={{ colorScheme: darkMode ? "dark" : "light" }}
    >
      {/* Top bar */}
      <div
        className={`flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 sm:px-6 py-4 backdrop-blur-md shadow-sm sticky top-0 z-20 transition-colors duration-500 ${
          darkMode ? "bg-white/5" : "bg-white/70"
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg shrink-0">
            🏟️
          </div>
          <div>
            <p className="text-sm text-gray-500">Dashboard</p>
            <span className="font-bold text-lg">Smart Stadium</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Search stadium"
            className={`p-2 rounded-full transition-all duration-200 ${
              darkMode
                ? "bg-white/10 text-yellow-300 hover:bg-white/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            aria-label="Help and support"
            className={`p-2 rounded-full transition-all duration-200 ${
              darkMode
                ? "bg-white/10 text-sky-300 hover:bg-white/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            <HelpCircle size={18} />
          </button>
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`p-2 rounded-full transition-all duration-200 ${
              darkMode
                ? "bg-white/10 text-yellow-300 hover:bg-white/20"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

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
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            {showNotifs && (
              <div
                className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl overflow-hidden border animate-[fadeIn_0.15s_ease-out] ${
                  darkMode
                    ? "bg-slate-800 border-white/10"
                    : "bg-white border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2 p-3 border-b border-gray-100/10">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button type="button" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 hover:text-slate-700">
                    Mark all read
                  </button>
                </div>
                {notifications.map((n, i) => {
                  const statusClass =
                    n.type === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : n.type === "alert"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-sky-50 text-sky-700";
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3 text-sm border-b last:border-0 transition-colors ${
                        darkMode ? "border-white/5 hover:bg-white/5" : "border-gray-50 hover:bg-gray-50"
                      }`}
                    >
                      <span className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full ${statusClass}`}>
                        <n.icon size={16} />
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                      <span
                        className={`mt-1 h-2 w-2 rounded-full ${
                          n.type === "success"
                            ? "bg-emerald-500"
                            : n.type === "alert"
                            ? "bg-amber-500"
                            : "bg-sky-500"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              aria-expanded={showProfile}
              aria-controls="profile-panel"
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
                id="profile-panel"
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
      <div className="relative mx-4 sm:mx-6 mt-6 rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 sm:px-10 py-10 sm:py-14">
          <div className="absolute inset-y-0 right-0 w-56 translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute inset-x-0 bottom-0 h-36 opacity-25">
            <svg className="h-full w-full" viewBox="0 0 800 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100 C100 70 200 120 300 88 C400 56 500 110 600 82 C700 54 800 100 800 160 L0 160 Z" fill="white" />
              <path d="M92 108h18v20h-18zm60-10h16v30h-16zm58 6h18v24h-18zm58-12h14v28h-14zm56 8h20v20h-20z" fill="white" opacity="0.35" />
            </svg>
          </div>
          {/* Floating ticket icons */}
          <div className="absolute right-8 top-6 float-y opacity-90">
            <svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80">
              <rect x="0.5" y="1" width="33" height="20" rx="3" stroke="white" strokeOpacity="0.25" fill="white" fillOpacity="0.06" />
              <path d="M8 6h18" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="absolute left-6 top-14 float-y opacity-80" style={{ animationDelay: '0.6s' }}>
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/75">
              <rect x="0.5" y="0.5" width="27" height="17" rx="3" stroke="white" strokeOpacity="0.18" fill="white" fillOpacity="0.04" />
            </svg>
          </div>
          <div className="absolute left-1/2 top-6 -translate-x-1/2 float-y opacity-75" style={{ animationDelay: '1.2s' }}>
            <svg width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70">
              <rect x="1" y="1" width="38" height="24" rx="3" stroke="white" strokeOpacity="0.14" fill="white" fillOpacity="0.03" />
            </svg>
          </div>
          <div className="relative grid gap-8 lg:grid-cols-[1.9fr_1fr] lg:items-end">
            <div className="relative z-10">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Match Day</p>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Welcome back, {user?.email?.split("@")[0]} 👋
              </h1>
              <p className="mt-3 max-w-xl text-sm banner-small-contrast sm:text-base">
                Your stadium assistant for tickets, live score updates, weather alerts, and match-day planning.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm text-white">
                  Aug 20 · 7:30 PM
                </span>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm text-white">
                  Gate B4 · Section West
                </span>
                <span className="rounded-full bg-white/20 px-4 py-2 text-sm text-white">
                  Kickoff in {countdown}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/ticket" className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-slate-100 focus-glow">
                  View Ticket
                </Link>
                <Link href="/map" className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/20 focus-glow">
                  Navigate to Gate
                </Link>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-center p-6">
              <div className="relative h-72 w-full max-w-[340px] rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute left-6 top-7 h-16 w-16 rounded-full bg-white/10 blur-xl" />
                <div className="absolute left-24 top-10 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute right-6 top-12 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                <div className="absolute inset-x-6 bottom-6 h-10 rounded-full bg-white/10" />
                <svg className="absolute left-1/2 top-16 h-28 w-28 -translate-x-1/2 text-white/20" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 62C8 42.536 26.536 24 46 24H74C93.464 24 112 42.536 112 62V88C112 92.418 108.418 96 104 96H16C11.582 96 8 92.418 8 88V62Z" stroke="currentColor" strokeWidth="3" opacity="0.55" />
                  <path d="M26 60H94" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                  <path d="M32 72H88" stroke="currentColor" strokeWidth="2" opacity="0.4" />
                  <path d="M38 84H82" stroke="currentColor" strokeWidth="2" opacity="0.35" />
                  <circle cx="42" cy="40" r="4" fill="currentColor" opacity="0.75" />
                  <circle cx="78" cy="44" r="4" fill="currentColor" opacity="0.75" />
                </svg>
                <div className="relative z-10 grid gap-4">
                  <div className="rounded-3xl bg-slate-900/10 p-5 text-white backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Live Score</p>
                    <div className="mt-5 flex items-center justify-between gap-4 text-6xl font-bold leading-none">
                      <div className="text-center">
                        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-orange-400/20 text-lg font-semibold text-orange-100 shadow-inner">
                          <span className="text-2xl">T</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-200">
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-orange-400" />
                          Tigers
                        </div>
                      </div>
                      <span className="text-white">1 - 0</span>
                      <div className="text-center">
                        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-sky-400/20 text-lg font-semibold text-sky-100 shadow-inner">
                          <span className="text-2xl">F</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-200">
                          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
                          Falcons
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-200">Second quarter · 08:32 remaining</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/10 p-4 text-white backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-sm text-slate-200"><CloudRain size={16} /> Weather</div>
                      <p className="mt-3 text-xl font-semibold">Light rain · 18°C</p>
                    </div>
                    <div className="rounded-3xl bg-white/10 p-4 text-white backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-sm text-slate-200"><Users size={16} /> Crowd</div>
                      <p className="mt-3 text-xl font-semibold">78% full</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 sm:px-6 py-8 max-w-5xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Quick actions</h2>
            <p className="text-sm text-gray-500">Everything you need for the match in one place.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/80 px-4 py-2 text-sm text-gray-700 shadow-sm">
            <CalendarDays size={16} /> 3 upcoming stadium events
          </div>
        </div>

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
          <Link href="/food">
            <FeatureCard
              icon={<Utensils size={22} />}
              title="Order Food"
              desc="Delivered to your seat"
              color="from-emerald-500 to-teal-600"
              dark={darkMode}
            />
          </Link>
          <Link href="/parking">
            <FeatureCard
              icon={<ParkingSquare size={22} />}
              title="Parking"
              desc="Check spot availability"
              color="from-cyan-500 to-blue-600"
              dark={darkMode}
            />
          </Link>
          <Link href="/news">
            <FeatureCard
              icon={<Newspaper size={22} />}
              title="Match News"
              desc="Live updates & scores"
              color="from-yellow-500 to-orange-600"
              dark={darkMode}
            />
          </Link>
        </div>

        <div className="mt-10 space-y-6">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Live score</p>
                  <p className="mt-3 text-2xl font-bold text-gray-900">{homeTeam} 1 - 0 {awayTeam}</p>
                </div>
                <Trophy className="text-sky-500" size={28} />
              </div>
              <p className="mt-4 text-sm text-gray-500">Looking strong in the second quarter with home crowd advantage.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Weather</p>
                  <p className="mt-3 text-2xl font-bold text-gray-900">18°C · Light rain</p>
                </div>
                <CloudRain className="text-sky-500" size={28} />
              </div>
              <p className="mt-4 text-sm text-gray-500">Rain gear available at the South Concourse.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Crowd</p>
                  <p className="mt-3 text-2xl font-bold text-gray-900">78% full</p>
                </div>
                <Users className="text-sky-500" size={28} />
              </div>
              <p className="mt-4 text-sm text-gray-500">Expect shorter lines near Gate B4 compared to the west entrance.</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Upcoming events</p>
                  <p className="mt-3 text-xl font-semibold text-gray-900">3 stadium experiences</p>
                </div>
                <CalendarDays className="text-sky-500" size={28} />
              </div>
              <ul className="mt-4 space-y-3 text-sm text-gray-500">
                <li>• Half-time trivia contest at the fan zone</li>
                <li>• Meet-and-greet with the mascot after the game</li>
                <li>• Late-night food special in Section A</li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Stadium alerts</p>
                  <p className="mt-3 text-xl font-semibold text-gray-900">Live notifications</p>
                </div>
                <Bell className="text-orange-500" size={28} />
              </div>
              <div className="mt-4 space-y-3 text-sm text-gray-500">
                <p>• Gate C2 will open in 8 minutes.</p>
                <p>• Extra seating available in Section D.</p>
                <p>• Order queue at the beer garden is light.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, dark, comingSoon }) {
  return (
    <div
      className={`group fade-in-up relative rounded-2xl p-4 sm:p-5 shadow-md transition-all duration-200 border cursor-pointer hover:-translate-y-1 hover:shadow-xl min-w-[280px] sm:min-w-[340px] md:min-w-[380px] ${
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