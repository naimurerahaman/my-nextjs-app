"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/service-provider/login",
        formData,
      );

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);

        // EXTRACTION LOGIC: Handle cases where ID is nested or named 'provider'
        const rawData = response.data;
        const extractedId =
          rawData.id ||
          rawData.providerId ||
          rawData.userId ||
          (rawData.provider && typeof rawData.provider === "object"
            ? rawData.provider.id
            : rawData.provider);

        const userData = {
          ...rawData,
          id: extractedId, // Ensure 'id' exists at the top level for our components
          email: rawData.email || formData.email,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        alert("Login successful!");
        router.push("/dashboard");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "400px",
        margin: "0 auto",
        minHeight: "100vh",
        color: "black",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#1e3a8a",
          color: "white",
        }}
      >
        Login
      </h1>
      {apiError && (
        <div
          style={{
            backgroundColor: "#fee",
            color: "#c00",
            padding: "12px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          {apiError}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "white",
            }}
          />
          {errors.email && (
            <span style={{ color: "#c00", fontSize: "12px" }}>
              {errors.email}
            </span>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "white",
            }}
          />
          {errors.password && (
            <span style={{ color: "#c00", fontSize: "12px" }}>
              {errors.password}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "#fcd600",
            color: "black",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p style={{ mt: "20px", textAlign: "center" }}>
        <Link href="/register" style={{ color: "#06c" }}>
          Need an account? Register
        </Link>
      </p>
    </div>
  );
}
