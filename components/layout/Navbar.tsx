"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NotificationBell from "../NotificationBell";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-black text-xl tracking-tight text-blue-900">
            Work<span className="text-yellow-500">Connect</span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-blue-900 font-medium hidden sm:block"
              >
                Dashboard
              </Link>
              <NotificationBell />
              <div className="h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-xs">
                PRO
              </div>
            </>
          ) : (
            <div className="flex gap-4">
              <Link
                href="/login"
                className="text-gray-600 font-medium py-2 px-4 hover:bg-gray-100 rounded-lg"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-900 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Join as Provider
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
