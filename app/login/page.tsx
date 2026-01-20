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

      console.log("Login response:", response.data); // Debug log

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);

        // Store user data properly - check what fields are available
        const userData = {
          id:
            response.data.id ||
            response.data.userId ||
            response.data.providerId ||
            response.data._id,
          email: response.data.email || formData.email,
          ...response.data, // Store all other fields from response
        };

        console.log("Storing user data:", userData); // Debug log
        localStorage.setItem("user", JSON.stringify(userData));
      }

      alert("Login successful!");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err); // Debug log
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
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "30px", color: "#1e3a8a" }}
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
              color: "#1e3a8a",
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
              color: "black",
              border: errors.email ? "2px solid #c00" : "1px solid #ccc",
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
              color: "#1e3a8a",
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
              color: "black",
              border: errors.password ? "2px solid #c00" : "1px solid #ccc",
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
            background: loading
              ? "#ccc"
              : "linear-gradient(to right, #fcd600, #fccf00)",
            color: "black",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        <Link href="/register" style={{ color: "#06c" }}>
          Need an account? Register
        </Link>
      </p>
    </div>
  );
}
