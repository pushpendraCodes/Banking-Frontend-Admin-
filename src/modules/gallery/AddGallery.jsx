import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddGallery = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const id = JSON.parse(localStorage.getItem("user"))._id;
  const token = localStorage.getItem("token");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", data.caption);
      formData.append("category", data.category);

      if (data.galleryImage && data.galleryImage.length > 0) {
        for (let file of data.galleryImage) {
          formData.append("galleryImage", file);
        }
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/gallery/add/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Gallery added successfully ✅");
      reset();
      setImagePreviews([]);
      navigate(-1);
    } catch (error) {
      console.error("Error uploading gallery:", error);
      alert("Failed to add gallery ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <>
      {/* Header Bar */}
      <div className="bg-[#dc5212] flex items-center gap-3 mb-6 m-2 rounded-lg  p-4 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-2  rounded-full hover:bg-yellow-100 transition"
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold tracking-wide text-black">
          Add Gallery
        </h2>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto mt-6 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700">Gallery Details</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Caption */}
          <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Caption
            </label>
            <input
              type="text"
              {...register("caption", { required: "Caption is required" })}
              className={`border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition ${
                errors.caption ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter caption"
              disabled={loading}
            />
            {errors.caption && (
              <p className="text-red-500 text-sm mt-1">{errors.caption.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className={`border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter category (e.g. events, products)"
              disabled={loading}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Gallery Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("galleryImage", { required: "Please select at least one image" })}
              onChange={handleImageChange}
              className={`w-full cursor-pointer text-sm text-gray-600 ${
                errors.galleryImage ? "border-red-500" : ""
              }`}
              disabled={loading}
            />
            {errors.galleryImage && (
              <p className="text-red-500 text-sm mt-1">{errors.galleryImage.message}</p>
            )}

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    <img
                      src={src}
                      alt="Preview"
                      className="h-32 w-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-md font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 shadow-md"
            }`}
          >
            {loading ? "Adding..." : "Add Gallery"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddGallery;
