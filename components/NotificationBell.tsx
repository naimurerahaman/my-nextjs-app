"use client";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeToast, setActiveToast] = useState<string | null>(null);

  useEffect(() => {
    // --- 1. PUSHER LOGIC (For Backend/Order Notifications) ---
    const pusher = new Pusher("015532b0b830ceb91802", { cluster: "ap2" });
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const providerId = user.providerId || user.id;

    if (providerId) {
      const channel = pusher.subscribe(`provider-${providerId}`);

      // Listen for backend orders (For your bonus marks)
      channel.bind("new-order", (data: any) => {
        addNotification(`New Order: ${data.orderDetails}`);
      });
    }

    // --- 2. LOCAL EVENT LOGIC (For Immediate Service Notification) ---
    const handleLocalNotification = (event: any) => {
      const message = event.detail.message;
      addNotification(message);
    };

    window.addEventListener("service-added", handleLocalNotification);

    return () => {
      pusher.disconnect();
      window.removeEventListener("service-added", handleLocalNotification);
    };
  }, []);

  const addNotification = (message: string) => {
    const newNotif = {
      id: Date.now(),
      message: message,
      time: new Date(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Show the pop-up toast
    setActiveToast(message);
    setTimeout(() => setActiveToast(null), 4000);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Pop-up Toast UI */}
      {activeToast && (
        <div className="fixed top-20 right-5 bg-blue-900 text-white p-5 rounded-2xl shadow-2xl border-l-8 border-yellow-400 z-[9999] animate-in fade-in slide-in-from-right-10 duration-300 flex items-center gap-4">
          <div className="bg-yellow-400 text-blue-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
            🔔
          </div>
          <div>
            <p className="font-black text-[10px] uppercase tracking-widest text-yellow-400">
              System Alert
            </p>
            <p className="text-sm font-bold">{activeToast}</p>
          </div>
        </div>
      )}

      {/* Bell Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2.5 bg-yellow-400 rounded-xl hover:bg-yellow-500 transition-all active:scale-90 shadow-md flex items-center justify-center w-11 h-11"
      >
        <span className="text-xl">🔔</span>
        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 z-[1000] overflow-hidden text-black">
          <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-black text-xs uppercase tracking-tighter">
              Notifications
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={() => setNotifications([])}
                className="text-[10px] font-bold text-blue-600 hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm font-bold text-gray-800 leading-tight mb-1">
                    {notif.message}
                  </p>
                  <p className="text-[10px] font-black text-gray-300 uppercase">
                    {notif.time.toLocaleTimeString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-10 text-center">
                <p className="text-4xl mb-2">🎈</p>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  All caught up!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
