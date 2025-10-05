import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { apiAdminBannerUrl } from "../../api/apiRoutes";

const UpdateBanner = () => {
  const navigate = useNavigate();
  const { id, itemId } = useParams(); // id = adminId, itemId = bannerId

  const [type, setType] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
 const token = localStorage.getItem("token")
  // Fetch banner data
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get(`${apiAdminBannerUrl}/get/${itemId}`);
        if (res.data) {
          setType(res.data.data.type || "");
          setImagePreview(res.data.data.imageUrl || null);
        }
      } catch (err) {
        console.error("Error fetching banner:", err);
        alert("Failed to load banner data");
      }
    };
    fetchBanner();
  }, [itemId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type) {
      alert("Please enter banner type");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("type", type);
      if (imageFile) {
        formData.append("bannerImage", imageFile); // normal file upload
      }

      await axios.put(
        `${apiAdminBannerUrl}/update/${itemId}/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`,  },
        }
      );

      alert("Banner updated successfully!");
      navigate("/banners");
    } catch (err) {
      console.error("Error updating banner:", err.response?.data || err);
      alert("Failed to update banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto mt-2 p-4 bg-white rounded shadow">
      <div className="bg-[#dc5212] flex items-center gap-2 mb-4 p-3 rounded">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-1 border-2 rounded-4xl"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold">Update Website Banner</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Banner Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 border px-3 py-2 rounded w-full"
            placeholder="Enter banner type"
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className="mt-1 border px-3 py-2 rounded w-full"
          />
        </div>

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 h-40 w-full object-cover rounded border"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`bg-yellow-400 text-white px-9 py-2 rounded hover:bg-yellow-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Banner"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
