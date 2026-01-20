"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher("015532b0b830ceb91802", {
      cluster: "ap2",
    });

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const providerId = user.providerId || user.id;

    // Subscribe to provider's channel
    const channel = pusher.subscribe(`provider-${providerId}`);

    // Listen for new order events
    channel.bind("new-order", (data: any) => {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: `New order received: ${data.orderDetails}`,
          time: new Date(),
        },
      ]);
    });

    // Listen for order status updates
    channel.bind("order-status", (data: any) => {
      setNotifications((prev) => [
        ...prev,
        {
          id: Date.now(),
          message: `Order #${data.orderId} status: ${data.status}`,
          time: new Date(),
        },
      ]);
    });

    return () => {
      pusher.unsubscribe(`provider-${providerId}`);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          position: "relative",
          padding: "10px",
          background: "#fcd600",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          width: "45px",
          height: "45px",
          fontSize: "20px",
        }}
      >
        🔔
        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              background: "#f44",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "55px",
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          <div style={{ padding: "15px", borderBottom: "1px solid #eee" }}>
            <h3 style={{ margin: 0 }}>Notifications</h3>
          </div>
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <p style={{ fontSize: "14px", margin: "0 0 5px 0" }}>
                  {notif.message}
                </p>
                <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                  {notif.time.toLocaleTimeString()}
                </p>
              </div>
            ))
          ) : (
            <div
              style={{ padding: "20px", textAlign: "center", color: "#666" }}
            >
              No new notifications
            </div>
          )}
        </div>
      )}
    </div>
  );
}
