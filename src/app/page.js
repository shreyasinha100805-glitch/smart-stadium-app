"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@/lib/authWrapper";
import { Mail, Lock, Eye, EyeOff, Moon, Sun, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "@/lib/authWrapper";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.replace("/dashboard");
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");
    try {
      await createUserWithEmailAndPassword(email, password);
      setMessage("✅ Account created! You're logged in.");
      router.replace("/dashboard");
    } catch (err) {
      setMessage("❌ " + err.message.replace("Firebase: ", "").replace("Auth: ", ""));
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      await signInWithEmailAndPassword(email, password);
      setMessage("✅ Logged in successfully!");
      router.replace("/dashboard");
    } catch (err) {
      setMessage("❌ " + err.message.replace("Firebase: ", "").replace("Auth: ", ""));
    }
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin();
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-black"
          : "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200"
      }`}
    >
      {/* Dark mode toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-6 right-6 p-2 rounded-full shadow-md transition-all duration-300 ${
          darkMode
            ? "bg-slate-800 text-yellow-300 hover:bg-slate-700"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div
        className={`w-full max-w-sm p-8 rounded-2xl shadow-2xl backdrop-blur-xl border transition-all duration-500 ${
          darkMode
            ? "bg-white/10 border-white/10 text-white"
            : "bg-white/60 border-white/40 text-gray-900"
        }`}
      >
        {/* Logo / Branding */}
        <div className="flex flex-col items-center mb-8">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-lg ${
              darkMode
                ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                : "bg-gradient-to-br from-blue-500 to-indigo-600"
            }`}
          >
            🏟️
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Smart Stadium</h1>
          <p
            className={`text-sm mt-1 ${
              darkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Your fan experience, elevated
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Authentication form">
          {/* Email input */}
          <div className="relative mb-4">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <Mail
              size={18}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-400"
              }`}
            />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full pl-10 pr-3 py-3 rounded-xl border outline-none transition-all duration-200 focus:ring-2 ${
                darkMode
                  ? "bg-white/10 border-white/20 placeholder-gray-400 focus:ring-indigo-400"
                  : "bg-white border-gray-200 placeholder-gray-400 focus:ring-blue-400"
              }`}
            />
          </div>

          {/* Password input */}
          <div className="relative mb-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Lock
              size={18}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                darkMode ? "text-gray-400" : "text-gray-400"
              }`}
            />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className={`w-full pl-10 pr-10 py-3 rounded-xl border outline-none transition-all duration-200 focus:ring-2 ${
                darkMode
                  ? "bg-white/10 border-white/20 placeholder-gray-400 focus:ring-indigo-400"
                  : "bg-white border-gray-200 placeholder-gray-400 focus:ring-blue-400"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3 rounded-xl font-medium shadow-md transition-all duration-200 disabled:opacity-60"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Sign Up"}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 flex items-center justify-center gap-2 active:scale-95 py-3 rounded-xl font-medium shadow-md transition-all duration-200 disabled:opacity-60 ${
                darkMode
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-gray-900 hover:bg-black text-white"
              }`}
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : "Log In"}
            </button>
          </div>

          {/* Message */}
          {message && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-5 text-sm text-center rounded-lg py-2 px-3 transition-all duration-300 ${
                message.startsWith("✅")
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}