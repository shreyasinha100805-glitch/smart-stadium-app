"use client";

import React from "react";
import { Github, Google } from "lucide-react";

export default function SocialLogin({ onGoogle, onGitHub }) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onGoogle}
        className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm bg-white hover:bg-gray-50 transition focus-glow"
      >
        <Google size={16} /> Continue with Google
      </button>

      <button
        onClick={onGitHub}
        className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm bg-white hover:bg-gray-50 transition focus-glow"
      >
        <Github size={16} /> Continue with GitHub
      </button>
    </div>
  );
}
