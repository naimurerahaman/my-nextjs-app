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
  }, []);

  const fetchServices = async (userData: any) => {
    try {
      const providerId = userData.providerId || userData.id;
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

  if (loading)
    return <div className="p-10 text-center">Loading Dashboard...</div>;
  if (!user) return null;

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-black">
      {/* Navbar-like Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900">
          WorkConnect Dashboard
        </h1>
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold">Welcome, {user.name}!</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.serviceId}
            className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-400"
          >
            <h3 className="font-bold">{service.serviceName}</h3>
            <p className="text-sm text-gray-500">{service.category}</p>
            <p className="text-lg font-bold mt-2">৳{service.price}</p>
            <Link
              href={`/services/${service.serviceId}`}
              className="block mt-3 text-center bg-yellow-400 p-2 rounded font-bold text-sm"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
