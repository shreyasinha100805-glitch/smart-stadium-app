"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, CheckCircle2 } from "lucide-react";

const menuItems = [
  { id: 1, name: "Stadium Burger", desc: "Beef patty, cheese, and fries.", price: 12 },
  { id: 2, name: "Loaded Nachos", desc: "Nachos with salsa, cheese, and jalapeños.", price: 8 },
  { id: 3, name: "Chicken Wrap", desc: "Grilled chicken, greens, and ranch.", price: 10 },
  { id: 4, name: "Soft Drink", desc: "Choose cola, lemonade, or iced tea.", price: 4 },
];

export default function FoodOrder() {
  const [cart, setCart] = useState([]);
  const [ordered, setOrdered] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setOrdered(false);
  };

  const placeOrder = () => {
    if (!cart.length) return;
    setOrdered(true);
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 mb-6 w-fit"
      >
        <ArrowLeft size={18} /> Back
      </Link>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm text-indigo-600 font-semibold">Food & Drink</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">Order to Your Seat</h1>
              <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                Choose your favorites and have them brought to your section in minutes.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700 shadow-sm">
              <ShoppingCart size={18} /> {cart.length} items
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.id} className="rounded-3xl bg-white shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                  <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold text-gray-900">${item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-3xl bg-white shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Your Order</p>
                <h2 className="text-xl font-semibold text-gray-900">Cart Summary</h2>
              </div>
              {ordered && (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 size={16} /> Placed
                </span>
              )}
            </div>

            <div className="space-y-3">
              {cart.length ? (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex items-center justify-between rounded-2xl bg-gray-50 p-3">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="font-semibold text-gray-900">${item.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Your cart is empty. Add something tasty!</p>
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Total</span>
                <span className="font-semibold text-gray-900">${total}</span>
              </div>
              <button
                onClick={placeOrder}
                disabled={!cart.length}
                className="mt-4 w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-indigo-300 hover:bg-indigo-700"
              >
                {ordered ? "Order placed" : "Place order"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
