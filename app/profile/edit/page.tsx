"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { validatePhone, validateName } from "@/lib/validation";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [providerId, setProviderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          router.push("/login");
          return;
        }
        const user = JSON.parse(userStr);

        // Extract ID and convert to Number
        const id =
          user.id || user.providerId || (user.provider && user.provider.id);
        if (!id) {
          router.push("/login");
          return;
        }
        setProviderId(Number(id));

        // GET current profile to fill the form (Route #14)
        const response = await axiosInstance.get(
          `/service-provider/profile/${id}`,
        );
        setFormData({
          name: response.data.name || user.name || "",
          phoneNumber: response.data.phoneNumber || user.phoneNumber || "",
        });
      } catch (err) {
        const localUser = JSON.parse(localStorage.getItem("user") || "{}");
        setFormData({
          name: localUser.name || "",
          phoneNumber: localUser.phoneNumber || "",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    // Data to send
    const payload = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
    };

    try {
      /**
       * THE MOST LIKELY PATH (Route #5)
       * NestJS joins @Controller('service-provider') + @Put('/service-provider/update-profile')
       */
      const fullPath = `/service-provider/service-provider/update-profile/${providerId}`;
      console.log("Attempting Update at:", fullPath);

      await axiosInstance.put(fullPath, payload);

      // If successful, update local storage and redirect
      const userStr = localStorage.getItem("user");
      const user = JSON.parse(userStr || "{}");
      localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));

      alert("Profile updated successfully!");
      router.push("/profile");
    } catch (err: any) {
      console.error("Update failed. Server response:", err.response);

      // FALLBACK: If the doubled path fails, try the standard REST path (Route #15)
      if (err.response?.status === 404) {
        try {
          console.log("Doubled path failed, trying Route #15 (PATCH)...");
          await axiosInstance.patch(
            `/service-provider/profile/${providerId}`,
            payload,
          );

          alert("Profile updated successfully!");
          router.push("/profile");
          return;
        } catch (innerErr: any) {
          console.error("Route #15 also failed:", innerErr.response);
          alert(
            `Update failed. Server said: ${innerErr.response?.data?.message || "Route Not Found"}`,
          );
        }
      } else {
        alert(
          err.response?.data?.message || "An error occurred during update.",
        );
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center text-black font-black uppercase tracking-widest">
        Loading...
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-4 text-black">
      <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-900 h-32 flex items-center px-10">
          <h1 className="text-2xl font-black text-yellow-400 uppercase tracking-tight">
            Edit Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border-2 p-5 rounded-2xl bg-gray-50 focus:border-yellow-400 outline-none font-bold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="w-full border-2 p-5 rounded-2xl bg-gray-50 focus:border-yellow-400 outline-none font-bold"
            />
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <button
              type="submit"
              disabled={updating}
              className="bg-yellow-400 text-blue-900 font-black py-5 rounded-2xl hover:bg-yellow-500 shadow-xl disabled:opacity-50 uppercase tracking-widest text-sm"
            >
              {updating ? "Saving..." : "💾 Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="bg-gray-100 text-gray-400 font-black py-5 rounded-2xl uppercase tracking-widest text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
