"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section className="hero" style={{ padding: "50px 20px" }}>
        <h1 style={{ fontSize: "42px", marginBottom: "20px", color: "#333" }}>
          Welcome to WorkConnect
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Your All-in-One Home and Business Service Platform.
        </p>
        <p
          style={{
            fontSize: "18px",
            color: "#666",
            maxWidth: "700px",
            margin: "10px auto 30px",
          }}
        >
          Hire professional teams or individuals for household and business
          tasks like painting, shifting, plumbing, cleaning, repairs, and more.
        </p>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => router.push("/login")}
            style={{
              padding: "12px 30px",
              borderRadius: "5px",
              background:
                "linear-gradient(to right, rgba(252, 206, 0, 1), rgba(253, 207, 0, 1))",
              color: "black",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Get Started
          </button>
          <button
            onClick={() => router.push("/register")}
            style={{
              padding: "12px 30px",
              borderRadius: "5px",
              background: "white",
              color: "black",
              border: "2px solid rgba(252, 206, 0, 1)",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Register Now
          </button>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="features" style={{ padding: "30px 20px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "#333" }}>
          Core Features
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            className="card"
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Customer</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Browse services, book teams or workers, pay online, track orders,
              and rate services.
            </p>
          </div>
          <div
            className="card"
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>
              Service Provider
            </h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Manage services, accept jobs, chat with customers, track earnings,
              and manage team members.
            </p>
          </div>
          <div
            className="card"
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Admin</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Manage users, services, commissions, analytics, complaints, and
              approve providers.
            </p>
          </div>
          <div
            className="card"
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Worker</h3>
            <p style={{ color: "#666", fontSize: "14px" }}>
              View assigned jobs, update progress, track location, chat with
              team leader, and monitor payments.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="services" style={{ padding: "30px 20px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "#333" }}>
          Popular Services
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            className="service-card"
            style={{
              width: "220px",
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "180px",
                height: "120px",
                background: "#fcd600",
                borderRadius: "5px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🎨
            </div>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Painting</h3>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                background:
                  "linear-gradient(to right, rgba(252, 206, 0, 1), rgba(253, 207, 0, 1))",
                color: "black",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Explore
            </button>
          </div>

          <div
            className="service-card"
            style={{
              width: "220px",
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "180px",
                height: "120px",
                background: "#4caf50",
                borderRadius: "5px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🚚
            </div>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Shifting</h3>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                background:
                  "linear-gradient(to right, rgba(252, 206, 0, 1), rgba(253, 207, 0, 1))",
                color: "black",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Explore
            </button>
          </div>

          <div
            className="service-card"
            style={{
              width: "220px",
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "180px",
                height: "120px",
                background: "#2196f3",
                borderRadius: "5px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🔧
            </div>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Plumbing</h3>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                background:
                  "linear-gradient(to right, rgba(252, 206, 0, 1), rgba(253, 207, 0, 1))",
                color: "black",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Explore
            </button>
          </div>

          <div
            className="service-card"
            style={{
              width: "220px",
              textAlign: "center",
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "180px",
                height: "120px",
                background: "#9c27b0",
                borderRadius: "5px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              🧹
            </div>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>Cleaning</h3>
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "5px",
                background:
                  "linear-gradient(to right, rgba(252, 206, 0, 1), rgba(253, 207, 0, 1))",
                color: "black",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" style={{ padding: "30px 20px 50px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "#333" }}>
          What Our Users Say
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              &quot;WorkConnect made my house shifting so easy! Professional and
              on time.&quot;
            </p>
            <h4 style={{ color: "#333", fontSize: "16px" }}>
              - Shizan, Customer
            </h4>
          </div>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              &quot;I manage my cleaning team efficiently with this platform.
              Everything is tracked perfectly.&quot;
            </p>
            <h4 style={{ color: "#333", fontSize: "16px" }}>
              - Emon, Service Provider
            </h4>
          </div>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                fontStyle: "italic",
                marginBottom: "10px",
              }}
            >
              &quot;As an admin, I can control services, users, and track
              revenue easily. Love it!&quot;
            </p>
            <h4 style={{ color: "#333", fontSize: "16px" }}>- Shoab, Admin</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
