"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { validateServicePrice } from "@/lib/validation";

export default function CreateService() {
  const router = useRouter();

  // 1. Form State
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
    category: "",
  });

  // 2. UI & Auth State
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string>("");

  // 3. Authentication Check & Provider ID Extraction (Requirement: Authentication)
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setAuthError("User not logged in. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      const user = JSON.parse(userStr);

      // Handle different backend response structures for the ID
      const id =
        user.id ||
        user.providerId ||
        (user.provider && typeof user.provider === "object"
          ? user.provider.id
          : user.provider);

      if (!id) {
        setAuthError("Provider ID not found in session. Please log in again.");
        return;
      }

      setProviderId(String(id));
    } catch (error) {
      setAuthError("Session error. Please log in again.");
    }
  }, [router]);

  // 4. Input Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: null }));
  };

  // 5. Form Submission (Requirement: Axios Data Fetching & Data Validation)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!providerId) return;

    // Front-end Validation Logic
    const newErrors: any = {};
    if (!formData.serviceName)
      newErrors.serviceName = "Service Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";

    const priceErr = validateServicePrice(formData.price);
    if (priceErr) newErrors.price = priceErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Mapping keys to match NestJS Backend Requirements
      const payload = {
        serviceTitle: formData.serviceName, // Backend expects serviceTitle
        description: formData.description,
        price: Number(formData.price), // Convert to Number
        serviceCategory: formData.category, // Backend expects serviceCategory
      };

      // AXIOS SCENARIO #4: POST Data to Backend
      await axiosInstance.post(
        `/service-provider/service/${providerId}`,
        payload,
      );

      // TRIGGER REAL-TIME NOTIFICATION (Requirement: Pusher/Notification logic)
      const event = new CustomEvent("service-added", {
        detail: {
          message: `Service "${formData.serviceName}" has been successfully added!`,
        },
      });
      window.dispatchEvent(event);

      alert("Service created successfully!");

      // Redirect to dashboard (Requirement: Routing)
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Submission Error:", error);
      const serverMessage = error.response?.data?.message;

      if (Array.isArray(serverMessage)) {
        alert("Validation Error: " + serverMessage.join(", "));
      } else {
        alert(serverMessage || "Failed to create service. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 6. Conditional Rendering for Auth Errors
  if (authError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-black p-4">
        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 text-center">
          <p className="text-red-600 font-black text-xl mb-2">AUTH ERROR</p>
          <p className="text-gray-600 font-bold">{authError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-10 text-center mt-6">
        <h1 className="text-4xl font-black text-blue-900 tracking-tight uppercase">
          Add New Service
        </h1>
        <p className="text-gray-500 font-bold mt-2 italic">
          Fill in the details below to list your service on WorkConnect.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 text-black">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Service Name / Title
            </label>
            <input
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className={`w-full border-2 p-5 rounded-2xl outline-none transition-all font-bold text-lg ${errors.serviceName ? "border-red-500 bg-red-50" : "border-gray-50 bg-gray-50 focus:border-yellow-400 focus:bg-white"}`}
              placeholder="e.g. Master Bedroom Painting"
            />
            {errors.serviceName && (
              <p className="text-red-600 text-xs font-black ml-1">
                {errors.serviceName}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Detailed Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border-2 p-5 rounded-2xl outline-none transition-all font-medium text-gray-700 min-h-[150px] ${errors.description ? "border-red-500 bg-red-50" : "border-gray-50 bg-gray-50 focus:border-yellow-400 focus:bg-white"}`}
              placeholder="Explain exactly what you provide in this service..."
            />
            {errors.description && (
              <p className="text-red-600 text-xs font-black ml-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Price and Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Base Price (৳)
              </label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full border-2 p-5 rounded-2xl outline-none transition-all font-black text-xl ${errors.price ? "border-red-500 bg-red-50" : "border-gray-50 bg-gray-50 focus:border-yellow-400 focus:bg-white"}`}
                placeholder="1500"
              />
              {errors.price && (
                <p className="text-red-600 text-xs font-black ml-1">
                  {errors.price}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Service Category
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full border-2 p-5 rounded-2xl outline-none transition-all font-bold text-lg ${errors.category ? "border-red-500 bg-red-50" : "border-gray-50 bg-gray-50 focus:border-yellow-400 focus:bg-white"}`}
                placeholder="e.g. Painting, Cleaning"
              />
              {errors.category && (
                <p className="text-red-600 text-xs font-black ml-1">
                  {errors.category}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-yellow-400 text-blue-900 font-black py-5 rounded-2xl hover:bg-yellow-500 shadow-xl hover:shadow-yellow-100 transition-all disabled:opacity-50 text-sm uppercase tracking-widest"
            >
              {loading ? "Submitting to Server..." : "🚀 Publish Service"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="flex-1 bg-gray-100 text-gray-400 font-black py-5 rounded-2xl hover:bg-gray-200 transition-all text-sm uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
