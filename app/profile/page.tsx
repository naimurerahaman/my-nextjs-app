"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const providerId = user.providerId || user.id;

        // Scenario #6: Axios Fetch for Provider Details
        const response = await axiosInstance.get(
          `/service-provider/profile/${providerId}`,
        );
        setProfile(response.data);
      } catch (err) {
        console.error("Profile fetch failed");
        setProfile(JSON.parse(localStorage.getItem("user") || "{}"));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-black">
        <p className="animate-pulse font-bold">Loading Profile...</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto text-black p-4">
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Banner */}
        <div className="bg-yellow-400 h-32 relative">
          {/* FIXED LINK: Path is now absolute and points to the correct route folder */}
          <Link
            href="/profile/edit"
            className="absolute bottom-4 right-8 bg-blue-900 text-white px-6 py-2.5 rounded-2xl font-black shadow-lg hover:bg-black transition-all text-sm uppercase tracking-widest z-10"
          >
            ✏️ Edit Profile
          </Link>
        </div>

        <div className="px-10 pb-12">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-6">
            <div className="w-32 h-32 bg-blue-900 rounded-full border-[6px] border-white flex items-center justify-center text-white text-4xl font-black shadow-md">
              {profile?.name?.charAt(0) || "U"}
            </div>
          </div>

          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            {profile?.name || "User Name"}
          </h1>
          <p className="text-gray-400 mb-10 font-bold italic text-sm">
            Professional Service Provider
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Email Address
              </p>
              <p className="font-bold text-lg">{profile?.email || "N/A"}</p>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Phone Number
              </p>
              <p className="font-bold text-lg">
                {profile?.phoneNumber || "Not provided"}
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Account Status
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <p className="text-green-600 font-black text-lg">ACTIVE</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-lg transition-all">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Member Since
              </p>
              <p className="font-bold text-lg text-blue-900">January 2024</p>
            </div>
          </div>

          {/* Back Navigation */}
          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="text-gray-400 font-black text-xs uppercase tracking-widest hover:text-blue-900 transition-colors"
            >
              ← Back to Command Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
