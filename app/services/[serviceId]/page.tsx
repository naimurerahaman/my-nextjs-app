"use client";
import { useEffect, useState, use } from "react"; // Added 'use' for params
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/lib/axios";

export default function ServiceDetail({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const router = useRouter();
  const { serviceId } = use(params); // Correct way to unwrap params in Next 15
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const providerId = user.providerId || user.id;

        const response = await axiosInstance.get(
          `/service-provider/services/${providerId}`,
        );
        const foundService = response.data.find(
          (s: any) => String(s.serviceId) === serviceId,
        );
        setService(foundService);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceId]);

  if (loading)
    return <div className="p-10 text-center">Loading details...</div>;
  if (!service)
    return <div className="p-10 text-center">Service not found.</div>;

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const providerId = user.providerId || user.id;
      // FETCH SCENARIO #5: DELETE
      await axiosInstance.delete(
        `/service-provider/service/${providerId}/${serviceId}`,
      );
      alert("Service deleted!");
      router.push("/dashboard");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-10">
      <Link href="/dashboard" className="text-blue-600 mb-4 block">
        ← Back to Dashboard
      </Link>
      <div className="bg-white p-8 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold mb-4">{service.serviceName}</h1>
        <p className="text-gray-700 mb-6 text-lg">{service.description}</p>
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-xl font-bold">৳{service.price}</p>
          </div>
          <div>
            <p className="text-gray-500">Category</p>
            <p className="text-xl font-bold">{service.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
