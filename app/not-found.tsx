import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "100px", margin: "0", color: "#fcd600" }}>404</h1>
      <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ color: "#666", marginBottom: "30px" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <button
          style={{
            padding: "12px 30px",
            background: "linear-gradient(to right, #fcd600, #fccf00)",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            color: "black",
          }}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}
