"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "@/lib/authWrapper";
import { QRCodeSVG } from "qrcode.react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Ticket() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        return;
      }

      setUser(null);
    });
    return () => unsub();
  }, []);

  if (!user) return null;

  const ticketId = user.uid.slice(0, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 w-fit"
      >
        <ArrowLeft size={18} /> Back
      </Link>

      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
          <p className="text-sm opacity-80">Smart Stadium</p>
          <h1 className="text-xl font-bold mt-1">Match Day Ticket</h1>
        </div>
        <div className="p-6 flex flex-col items-center">
          <QRCodeSVG value={ticketId} size={180} />
          <p className="mt-4 text-sm text-gray-500">Ticket ID</p>
          <p className="text-lg font-mono font-semibold text-gray-800">
            {ticketId}
          </p>
          <div className="w-full border-t border-dashed my-5" />
          <div className="w-full flex justify-between text-sm text-gray-600">
            <div>
              <p className="text-gray-400">Gate</p>
              <p className="font-semibold text-gray-800">B4</p>
            </div>
            <div>
              <p className="text-gray-400">Seat</p>
              <p className="font-semibold text-gray-800">14C</p>
            </div>
            <div>
              <p className="text-gray-400">Section</p>
              <p className="font-semibold text-gray-800">West</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}