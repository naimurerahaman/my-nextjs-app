// app/dashboard/loading.tsx
"use client";
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #f0f3c2ff, #eeeeee)",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #fcd600",
          borderRadius: "50%",
          margin: "0 auto 20px",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <h2>Loading...</h2>

      {/* Spinner CSS */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
