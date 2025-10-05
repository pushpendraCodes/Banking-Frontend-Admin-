import { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function BannerList() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminId = JSON.parse(localStorage.getItem("user"))?._id;
  const token = localStorage.getItem("token")

  // ✅ Fetch admin + banners
  useEffect(() => {
    const fetchAdmin = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}admin/get`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setAdmin(res.data.data);
      } catch (err) {
        console.error("Error fetching admin:", err);
        setError("Failed to load banners");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  // ✅ Delete banner
  const deleteBanner = async (bannerId) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/banner/delete/${bannerId}/${adminId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      // Remove banner locally after deletion
      setAdmin((prev) => ({
        ...prev,
        banners: prev.banners.filter((b) => b._id !== bannerId),
      }));

      alert("Banner deleted successfully ✅");
    } catch (err) {
      console.error("Error deleting banner:", err);
      alert("Failed to delete banner ❌");
    }
  };

  if (loading) return <p className="text-center py-4">Loading banners...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  const banners = admin?.banners || [];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between p-3 rounded-md bg-[#dc5212] items-center mb-4">
        <h2 className="text-xl font-bold">Website Banners</h2>
        <Link
          to="/banner/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Banner
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">SR. No.</th>
              <th className="px-4 py-2 border">Banner Image</th>
              <th className="px-4 py-2 border">Banner Type</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.length > 0 ? (
              banners.map((banner, idx) => (
                <tr key={banner._id} className="odd:bg-white even:bg-yellow-50">
                  <td className="px-4 py-2 border">{String(idx + 1).padStart(2, "0")}</td>
                  <td className="px-4 py-2 border">
                    <img
                      src={banner.imageUrl || "/placeholder.jpg"}
                      alt="banner"
                      className="w-32 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">{banner.type || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/banner/update/${adminId}/${banner._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaPen size={14} />
                      </Link>
                      <button
                        onClick={() => deleteBanner(banner._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No banners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
