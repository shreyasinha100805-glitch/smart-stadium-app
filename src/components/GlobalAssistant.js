"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, SendHorizonal, Sparkles, X } from "lucide-react";
import { generateAssistantReply } from "@/lib/aiAssistant.mjs";

const starterMessages = [
  {
    role: "assistant",
    content: "Hi! I can help with parking, food, tickets, accessibility, sustainability, crowd info, and transportation. What do you need?",
  },
];

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "ar", name: "العربية" },
  { code: "zh", name: "中文" },
];

const quickLinks = [
  { label: "🅿️ Parking", link: "/parking" },
  { label: "♿ Accessibility", link: "/accessibility" },
  { label: "🌱 Sustainability", link: "/sustainability" },
  { label: "🚌 Transportation", link: "/transportation" },
  { label: "📊 Operations", link: "/operations" },
];

export default function GlobalAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(starterMessages);
  const [language, setLanguage] = useState("en");

  const handleSend = (event) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) {
      return;
    }

    const userMessage = { role: "user", content: trimmed };
    const assistantMessage = {
      role: "assistant",
      content: generateAssistantReply(trimmed),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open AI assistant"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 transition-transform duration-200 hover:scale-105"
      >
        {open ? <X size={20} /> : <Bot size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(92vw,420px)] rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 overflow-hidden flex flex-col max-h-[70vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex items-center justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles size={16} /> Stadium AI Assistant
              </p>
              <p className="text-xs opacity-90 mt-1">Powered by GenAI</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/20">
              <X size={18} />
            </button>
          </div>

          {/* Language selector */}
          <div className="px-4 pt-3 pb-1">
            <label className="text-xs font-semibold text-gray-600">🌐 Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full mt-1 px-2 py-1 text-xs border border-gray-200 rounded-lg"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 shadow-sm border border-slate-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="px-4 py-2 border-t border-slate-200 bg-white">
            <p className="text-xs font-semibold text-gray-600 mb-2">📋 Quick Features</p>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.link}
                  className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 text-center transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Input form */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-slate-200 p-3 bg-white">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything..."
              className="flex-1 border-0 bg-transparent text-sm outline-none"
            />
            <button type="submit" className="rounded-xl bg-indigo-600 p-2 text-white transition hover:bg-indigo-700">
              <SendHorizonal size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
