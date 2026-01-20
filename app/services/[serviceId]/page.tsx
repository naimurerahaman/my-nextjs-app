"use client";
import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { validateServicePrice } from "@/lib/validation";

// FIX: Ensure proper default export
export default function EditService({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params); // Correct way to unwrap params in Next.js 15/16
  const serviceId = resolvedParams.serviceId;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    serviceTitle: "",
    description: "",
    price: "",
    serviceCategory: "",
  });
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const providerId = user.providerId || user.id;

        const response = await axiosInstance.get(
          `/service-provider/services/${providerId}`,
        );
        // Find by either serviceId or id
        const service = response.data.find(
          (s: any) => String(s.serviceId || s.id) === String(serviceId),
        );

        if (service) {
          setFormData({
            serviceTitle: service.serviceTitle || service.serviceName || "",
            description: service.description || "",
            price: String(service.price || ""),
            serviceCategory: service.serviceCategory || service.category || "",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceErr = validateServicePrice(formData.price);
    if (priceErr) {
      setErrors({ price: priceErr });
      return;
    }

    setUpdating(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const providerId = user.providerId || user.id;

      // Axios Scenario: PUT Update
      await axiosInstance.put(
        `/service-provider/service/${providerId}/${serviceId}`,
        {
          serviceTitle: formData.serviceTitle,
          description: formData.description,
          price: Number(formData.price),
          serviceCategory: formData.serviceCategory,
        },
      );

      alert("Service updated successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center text-black font-bold">
        Loading Service Data...
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-2xl mt-10 text-black border">
      <h1 className="text-3xl font-black mb-8 text-blue-900 uppercase">
        Edit Service
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-bold text-gray-700 mb-2 uppercase text-xs">
            Service Title
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-yellow-400 outline-none transition-all"
            value={formData.serviceTitle}
            onChange={(e) =>
              setFormData({ ...formData, serviceTitle: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label className="block font-bold text-gray-700 mb-2 uppercase text-xs">
            Description
          </label>
          <textarea
            className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-yellow-400 outline-none transition-all"
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-bold text-gray-700 mb-2 uppercase text-xs">
              Price (৳)
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-yellow-400 outline-none transition-all"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1 font-bold">
                {errors.price}
              </p>
            )}
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-2 uppercase text-xs">
              Category
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-yellow-400 outline-none transition-all"
              value={formData.serviceCategory}
              onChange={(e) =>
                setFormData({ ...formData, serviceCategory: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={updating}
            className="flex-[2] bg-yellow-400 text-blue-900 font-black py-4 rounded-xl hover:bg-yellow-500 shadow-lg disabled:opacity-50"
          >
            {updating ? "Saving Changes..." : "Update Service"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
