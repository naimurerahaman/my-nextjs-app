"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { validateServicePrice } from "@/lib/validation";

export default function CreateService() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    price: "",
    category: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [providerId, setProviderId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string>("");

  // Check authentication and get provider ID on component mount
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");

      console.log("=== DEBUG INFO ===");
      console.log("userStr:", userStr);

      if (!userStr) {
        setAuthError("User not logged in. Please log in first.");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      const user = JSON.parse(userStr);
      console.log("Parsed user:", user);
      console.log("User keys:", Object.keys(user));

      // Try multiple possible field names for provider ID
      const id =
        user.id ||
        user.providerId ||
        user._id ||
        user.userId ||
        user.serviceProviderId;

      console.log("Extracted Provider ID:", id);

      if (!id) {
        setAuthError(
          `Provider ID not found. Available fields: ${Object.keys(user).join(", ")}`,
        );
        setTimeout(() => router.push("/login"), 3000);
        return;
      }

      setProviderId(String(id)); // Convert to string
      console.log("Provider ID set successfully:", id);
    } catch (error) {
      console.error("Error reading user data:", error);
      setAuthError("Failed to load user data. Please log in again.");
      setTimeout(() => router.push("/login"), 2000);
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.serviceName)
      newErrors.serviceName = "Service name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";

    const priceError = validateServicePrice(formData.price);
    if (priceError) newErrors.price = priceError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Double-check provider ID before submission
    if (!providerId) {
      alert("Provider ID not available. Please log in again.");
      router.push("/login");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log(
        "Sending request to:",
        `/service-provider/service/${providerId}`,
      );
      console.log("Request data:", {
        ...formData,
        price: parseFloat(formData.price),
      });

      await axiosInstance.post(`/service-provider/service/${providerId}`, {
        ...formData,
        price: parseFloat(formData.price),
      });

      alert("Service created successfully!");
      router.push("/services");
    } catch (error: any) {
      console.error("Error creating service:", error);
      alert(error.response?.data?.message || "Failed to create service");
    } finally {
      setLoading(false);
    }
  };

  // Show error state
  if (authError) {
    return (
      <div
        style={{
          padding: "50px",
          maxWidth: "600px",
          margin: "0 auto",
          minHeight: "100vh",
          background: "#f9fafb",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <p style={{ color: "#dc2626", fontSize: "16px", textAlign: "center" }}>
          {authError}
        </p>
        <p style={{ color: "#6b7280", fontSize: "14px" }}>
          Redirecting to login...
        </p>
      </div>
    );
  }

  // Show loading state while checking authentication
  if (providerId === null) {
    return (
      <div
        style={{
          padding: "50px",
          maxWidth: "600px",
          margin: "0 auto",
          minHeight: "100vh",
          background: "#f9fafb",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#374151", fontSize: "16px" }}>
          Checking authentication... (Check console for debug info)
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#f9fafb",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#111827",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        Create New Service
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Service Name */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Service Name *
          </label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            placeholder="Enter service name"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: errors.serviceName
                ? "2px solid #f87171"
                : "1px solid #d1d5db",
              outline: "none",
              fontSize: "14px",
              color: "#111827",
              background: "#ffffff",
            }}
          />
          {errors.serviceName && (
            <span style={{ color: "#f87171", fontSize: "12px" }}>
              {errors.serviceName}
            </span>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your service"
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: errors.description
                ? "2px solid #f87171"
                : "1px solid #d1d5db",
              outline: "none",
              fontSize: "14px",
              color: "#111827",
              background: "#ffffff",
              resize: "vertical",
            }}
          />
          {errors.description && (
            <span style={{ color: "#f87171", fontSize: "12px" }}>
              {errors.description}
            </span>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Price (৳) *
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter service price"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: errors.price ? "2px solid #f87171" : "1px solid #d1d5db",
              outline: "none",
              fontSize: "14px",
              color: "#111827",
              background: "#ffffff",
            }}
          />
          {errors.price && (
            <span style={{ color: "#f87171", fontSize: "12px" }}>
              {errors.price}
            </span>
          )}
        </div>

        {/* Category */}
        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter service category"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: errors.category
                ? "2px solid #f87171"
                : "1px solid #d1d5db",
              outline: "none",
              fontSize: "14px",
              color: "#111827",
              background: "#ffffff",
            }}
          />
          {errors.category && (
            <span style={{ color: "#f87171", fontSize: "12px" }}>
              {errors.category}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "15px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "14px",
              background: loading
                ? "#d1d5db"
                : "linear-gradient(to right, #fcd34d, #fbbf24)",
              color: "#111827",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Creating..." : "Create Service"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            style={{
              flex: 1,
              padding: "14px",
              background: "#ffffff",
              color: "#111827",
              fontWeight: "600",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
