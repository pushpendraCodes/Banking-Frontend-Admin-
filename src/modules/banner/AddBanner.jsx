import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiAdminBannerUrl } from "../../api/apiRoutes";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddBanner = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loading state
 const token = localStorage.getItem("token")
  const onSubmit = async (data) => {
    try {
      setLoading(true); // start loading
      const adminId = JSON.parse(localStorage.getItem("user"))._id;

      const formData = new FormData();
      formData.append("type", data.type); // banner type
      if (data.image && data.image.length > 0) {
        formData.append("bannerImage", data.image[0]); // single image
      }

      // Call backend API
      await axios.post(`${apiAdminBannerUrl}/add/${adminId}`, formData, {
        headers: { "Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`, },
      });

      alert("Banner added successfully!");
      reset();
      setImagePreview(null);
      navigate("/banners"); // redirect to banner list
    } catch (error) {
      console.error("Error adding banner:", error);
      alert("Failed to add banner ❌");
    } finally {
      setLoading(false); // stop loading
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <>
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-red-600 m-2 flex items-center gap-2 mb-4 p-3 rounded">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-1 border-2 rounded-4xl"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold ">Add Website Banner</h2>
      </div>

      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Banner Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Banner Type</label>
            <input
              type="text"
              {...register("type", { required: true })}
              className="mt-1 border px-3 py-2 rounded w-full"
              placeholder="Enter banner type"
              disabled={loading} // disable during loading
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Banner Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              onChange={handleImageChange}
              className="mt-1 border px-3 py-2 rounded w-full"
              disabled={loading} // disable during loading
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-40 object-cover rounded border"
              />
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`bg-yellow-400 text-white px-9 py-2 rounded hover:bg-yellow-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // disable during loading
          >
            {loading ? "Adding..." : "Add Banner"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBanner;
