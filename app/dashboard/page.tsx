"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        alert("Please log in first");
        router.push("/login");
        return;
      }

      const user = JSON.parse(userStr);
      if (!user.providerId && !user.id) {
        alert("Provider ID not found. Please log in again.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error reading user data:", error);
      alert("Failed to load user data");
      router.push("/login");
    }
  }, [router]);

  const fetchServices = async (userData: any) => {
    try {
      const providerId = userData.providerId || userData.id;
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:3000/service-provider/services/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setServices(response.data || []);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    router.push("/");
  };

  if (loading) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>Loading...</div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "30px",
            alignItems: "center",
            color: "black",
          }}
        >
          <h1>Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "#f44",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: "30px",
            color: "black",
          }}
        >
          <h2>Welcome, {user.name || user.email}!</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Total Services:</strong> {services.length}
          </p>
        </div>

        <div style={{ marginBottom: "30px", color: "black" }}>
          <h2>Quick Actions</h2>
          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "15px",
            }}
          >
            <Link href="/services/create">
              <button
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(to right, #fcd600, #fccf00)",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Create New Service
              </button>
            </Link>
            <Link href="/services">
              <button
                style={{
                  padding: "12px 24px",
                  background: "#fff",
                  border: "2px solid #fcd600",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                View All Services
              </button>
            </Link>
          </div>
        </div>

        <div style={{ marginBottom: "30px", color: "black" }}>
          <h2>Your Services</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "15px",
              color: "black",
            }}
          >
            {services.length > 0 ? (
              services.slice(0, 6).map((service) => (
                <div
                  key={service.serviceId}
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3>{service.serviceName}</h3>
                  <p style={{ color: "#666", fontSize: "14px" }}>
                    {service.description}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#fcd600",
                    }}
                  >
                    ৳{service.price}
                  </p>
                  <Link href={`/services/${service.serviceId}`}>
                    <button
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#fcd600",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginTop: "10px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No services yet. Create your first service!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
