"use client";
import Link from "next/link";
import NotificationBell from "../NotificationBell";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md text-black">
      <Link href="/" className="font-bold text-xl">
        WorkConnect
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <NotificationBell />
      </div>
    </nav>
  );
}
