"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);
    fetchServices(userData);
  }, [router]);

  const fetchServices = async (userData: any) => {
    try {
      const providerId = userData.providerId || userData.id;
      // AXIOS SCENARIO #3: Fetching Data (GET)
      const response = await axiosInstance.get(
        `/service-provider/services/${providerId}`,
      );
      setServices(response.data || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (sId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const providerId = user.providerId || user.id;
      // AXIOS SCENARIO: Delete Request (DELETE)
      await axiosInstance.delete(
        `/service-provider/service/${providerId}/${sId}`,
      );
      alert("Service deleted successfully");
      setServices(services.filter((s) => (s.serviceId || s.id) !== sId));
    } catch (err) {
      alert("Failed to delete service");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
        <p className="text-gray-600 font-bold">
          Loading WorkConnect Dashboard...
        </p>
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen text-black pb-12">
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-900 tracking-tight">
            Hello, {user.name}! 👋
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Manage your household and business services from one place.
          </p>
        </div>
        <Link
          href="/services/create"
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-black px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          <span>+</span> Create New Service
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-yellow-400 transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Total Services
          </p>
          <p className="text-4xl font-black text-blue-900 tracking-tighter">
            {services.length}
          </p>
          <div className="mt-3 text-[10px] bg-green-100 text-green-700 font-black px-2 py-1 rounded-full inline-block">
            LIVE ON PLATFORM
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-yellow-400 transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Incoming Jobs
          </p>
          <p className="text-4xl font-black text-blue-900 tracking-tighter">
            14
          </p>
          <div className="mt-3 text-[10px] bg-blue-100 text-blue-700 font-black px-2 py-1 rounded-full inline-block">
            PENDING APPROVAL
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-yellow-400 transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Monthly Revenue
          </p>
          <p className="text-4xl font-black text-blue-900 tracking-tighter">
            ৳32k
          </p>
          <div className="mt-3 text-[10px] bg-yellow-100 text-yellow-700 font-black px-2 py-1 rounded-full inline-block">
            UP 12% THIS MONTH
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:border-yellow-400 transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Success Rate
          </p>
          <p className="text-4xl font-black text-blue-900 tracking-tighter">
            98%
          </p>
          <div className="mt-3 text-[10px] bg-purple-100 text-purple-700 font-black px-2 py-1 rounded-full inline-block">
            TOP RATED PRO
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Quick Actions Column */}
        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-2xl font-black text-gray-300 mb-6 uppercase tracking-tight">
            Command Center
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/profile"
              className="flex items-center p-5 bg-white rounded-3xl border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                👤
              </div>
              <div>
                <p className="font-black text-gray-900 uppercase text-xs">
                  Profile Settings
                </p>
                <p className="text-xs text-gray-400 font-bold mt-0.5">
                  Edit bio & contact details
                </p>
              </div>
            </Link>

            <Link
              href="/orders"
              className="flex items-center p-5 bg-white rounded-3xl border border-gray-100 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mr-4 group-hover:bg-green-600 group-hover:text-white transition-all">
                📦
              </div>
              <div>
                <p className="font-black text-gray-900 uppercase text-xs">
                  Job Orders
                </p>
                <p className="text-xs text-gray-400 font-bold mt-0.5">
                  View and track bookings
                </p>
              </div>
            </Link>

            <button
              onClick={() => {
                localStorage.clear();
                router.push("/login");
              }}
              className="flex items-center p-5 bg-red-50 rounded-3xl border border-red-100 hover:bg-red-100 transition-all w-full text-left group"
            >
              <div className="w-14 h-14 bg-white text-red-600 rounded-2xl flex items-center justify-center text-2xl mr-4 group-hover:scale-110 transition-transform">
                🚪
              </div>
              <div>
                <p className="font-black text-red-700 uppercase text-xs">
                  Log Out
                </p>
                <p className="text-xs text-red-400 font-bold mt-0.5">
                  Log out of account
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* My Services Column */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-black text-gray-300 uppercase tracking-tight">
              Active Portfolio
            </h2>
            <Link
              href="/services"
              className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
            >
              See Full List
            </Link>
          </div>

          {services.length === 0 ? (
            <div className="bg-white border-4 border-dashed border-gray-100 rounded-[40px] p-16 text-center">
              <div className="text-6xl mb-6">🔨</div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">
                Build Your Services
              </h3>
              <p className="text-gray-400 font-medium mb-8">
                You haven't listed any services for customers yet.
              </p>
              <Link
                href="/services/create"
                className="inline-block bg-blue-900 text-white font-black px-10 py-4 rounded-2xl hover:bg-black transition-all uppercase tracking-widest text-sm shadow-xl"
              >
                Get Started Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => {
                const sId = service.serviceId || service.id;
                return (
                  <div
                    key={sId}
                    className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-2xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-4">
                      <span className="bg-yellow-100 text-yellow-800 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">
                        {service.serviceCategory || service.category}
                      </span>
                    </div>
                    <h3 className="font-black text-xl text-gray-900 mb-2 pr-20 leading-tight">
                      {service.serviceTitle || service.serviceName}
                    </h3>
                    <p className="text-xs text-gray-400 font-bold line-clamp-2 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between border-t pt-5 border-gray-50 mt-auto">
                      <p className="text-2xl font-black text-blue-900">
                        ৳{service.price}
                      </p>
                      <div className="flex gap-2">
                        <Link
                          href={`/services/${sId}`}
                          className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl hover:bg-yellow-400 transition-colors"
                          title="Edit Service"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => handleDelete(sId)}
                          className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl hover:bg-red-100 text-red-500 transition-colors"
                          title="Delete Service"
                        >
                          🗑️
                        </button>
                        <Link
                          href={`/services/${sId}`}
                          className="bg-blue-900 text-white text-[10px] font-black px-5 py-2.5 rounded-xl hover:bg-black transition-all uppercase tracking-widest"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
