"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email format";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain uppercase letter";
    if (!/[0-9]/.test(password)) return "Password must contain a number";
    return null;
  };

  const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone))
      return "Invalid phone number (must be 11 digits starting with 01)";
    return null;
  };

  const validateName = (name: string): string | null => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
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

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const phoneError = validatePhone(formData.phoneNumber);
    if (phoneError) newErrors.phoneNumber = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      console.log("Sending registration data:", formData); // Debug log

      const response = await axios.post(
        "http://localhost:3000/service-provider/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Registration response:", response.data); // Debug log

      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      console.error("Registration error status:", err.response?.status); // Should show 409
      console.error("Conflict details:", err.response?.data); // This usually tells you WHICH field conflicted

      if (err.response?.status === 409) {
        setApiError("This email or phone number is already registered.");
      } else if (err.response?.data?.message) {
        console.error("Registration error:", err); // Debug log
        console.error("Error response:", err.response); // Debug log

        if (err.response?.data?.message) {
          if (Array.isArray(err.response.data.message)) {
            setApiError(err.response.data.message.join(", "));
          } else {
            setApiError(err.response.data.message);
          }
        } else if (err.response?.data) {
          setApiError(JSON.stringify(err.response.data));
        } else if (err.message) {
          setApiError(err.message);
        } else {
          setApiError(
            "Registration failed. Please check your network connection.",
          );
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "500px",
        margin: "0 auto",
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Service Provider Registration
      </h1>

      {apiError && (
        <div
          style={{
            backgroundColor: "#fee",
            color: "#c00",
            padding: "12px",
            borderRadius: "5px",
            marginBottom: "20px",
            border: "1px solid #fcc",
          }}
        >
          {apiError}
        </div>
      )}

      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: errors.name ? "2px solid #c00" : "1px solid #ccc",
              fontSize: "14px",
              color: "black",
            }}
          />
          {errors.name && (
            <span
              style={{
                color: "#c00",
                fontSize: "12px",
                display: "block",
                marginTop: "5px",
              }}
            >
              {errors.name}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: errors.email ? "2px solid #c00" : "1px solid #ccc",
              fontSize: "14px",
              color: "black",
            }}
          />
          {errors.email && (
            <span
              style={{
                color: "#c00",
                fontSize: "12px",
                display: "block",
                marginTop: "5px",
              }}
            >
              {errors.email}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min 6 chars, 1 uppercase, 1 number"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: errors.password ? "2px solid #c00" : "1px solid #ccc",
              fontSize: "14px",
              color: "black",
            }}
          />
          {errors.password && (
            <span
              style={{
                color: "#c00",
                fontSize: "12px",
                display: "block",
                marginTop: "5px",
              }}
            >
              {errors.password}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Phone Number *
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "5px",
              border: errors.phoneNumber ? "2px solid #c00" : "1px solid #ccc",
              fontSize: "14px",
              color: "black",
            }}
          />
          {errors.phoneNumber && (
            <span
              style={{
                color: "#c00",
                fontSize: "12px",
                display: "block",
                marginTop: "5px",
              }}
            >
              {errors.phoneNumber}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        <Link href="/login" style={{ color: "#06c", textDecoration: "none" }}>
          Already have account? Login
        </Link>
      </p>
    </div>
  );
}
