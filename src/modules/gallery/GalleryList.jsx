import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GalleryList() {
  const adminId = JSON.parse(localStorage.getItem("user"))._id;

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const token = localStorage.getItem("token")
  // Fetch admin data
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
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [adminId]);

  // Delete gallery item
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}admin/gallery/${adminId}/${itemId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      // Remove from local state
      setAdmin((prev) => ({
        ...prev,
        gallery: prev.gallery.filter((item) => item._id !== itemId),
      }));
    } catch (err) {
      console.error("Error deleting gallery item:", err);
      alert("Failed to delete gallery item");
    }
  };

  if (loading) return <p className="text-center py-4 text-gray-500">Loading gallery...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  const galleryItems = admin?.gallery || [];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between p-3 bg-[#dc5212] items-center mb-4">
        <h2 className="text-xl font-bold">Gallery Management</h2>
        <Link
          to="/gallary/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Gallery
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Serial No.</th>
              <th className="px-4 py-2 border">Images</th>
              <th className="px-4 py-2 border">Caption</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {galleryItems.length > 0 ? (
              galleryItems.map((item, idx) => {
                const visibleImages = item.imageUrls?.slice(0, 5) || [];
                const extraCount =
                  item.imageUrls && item.imageUrls.length > 5
                    ? item.imageUrls.length - 5
                    : 0;

                return (
                  <tr key={item._id || idx} className="odd:bg-white even:bg-yellow-50">
                    <td className="px-4 py-2 border">{String(idx + 1).padStart(2, "0")}</td>

                    {/* Show only 5 images + extra count */}
                    <td className="px-4 py-2 border">
                      <div className="flex gap-2 items-center">
                        {visibleImages.map((url, i) => (
                          <img
                            key={i}
                            src={url}
                            alt={item.caption || "gallery"}
                            className="w-16 h-12 object-cover rounded border"
                          />
                        ))}
                        {extraCount > 0 && (
                          <span className="w-16 h-12 flex items-center justify-center bg-gray-200 text-gray-700 text-sm rounded border">
                            +{extraCount}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-2 border">{item.caption || "—"}</td>
                    <td className="px-4 py-2 border capitalize">{item.category || "—"}</td>

                    <td className="px-4 py-2 border">
                      <div className="flex gap-2">
                        <Link
                          to={`/gallary/update/${admin._id}/${item._id}`}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                        >
                          <FaPen size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No gallery data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
