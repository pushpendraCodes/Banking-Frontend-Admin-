import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const UpdateGallery = () => {
  const navigate = useNavigate();
  const { id, itemId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Load existing gallery item
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}admin/gallery/get/${itemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const item = res.data.data;
        setValue("caption", item.caption || "");
        setValue("category", item.category || "");
        setExistingImages(item.imageUrls || []);
      } catch (err) {
        console.error("Error loading gallery item:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, itemId, setValue]);

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Remove an existing image
  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter((img) => img !== url));
  };

  // Submit form
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", data.caption);
      formData.append("category", data.category);
      formData.append("exstingImgUrls", JSON.stringify(existingImages));

      if (data.galleryImage && data.galleryImage.length > 0) {
        for (let file of data.galleryImage) {
          formData.append("galleryImage", file);
        }
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}admin/gallery/update/${id}/${itemId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Gallery updated successfully ✅");
      navigate(-1);
    } catch (error) {
      console.error("Error updating gallery:", error);
      alert("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-red-500 to-red-600 flex m-2 items-center gap-3 mb-6 p-4 rounded-lg  shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-2 border-2  rounded-full hover:bg-yellow-100 transition"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-black">Update Gallery</h2>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700">Gallery Details</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Caption */}
          <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="block text-sm font-medium mb-2 text-gray-700">Caption</label>
            <input
              type="text"
              {...register("caption", { required: "Caption is required" })}
              className={`border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition ${
                errors.caption ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter caption"
              disabled={loading}
            />
            {errors.caption && <p className="text-red-500 text-sm mt-1">{errors.caption.message}</p>}
          </div>

          {/* Category */}
          <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className={`border px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter category"
              disabled={loading}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          {/* Existing Images */}
          <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="block text-sm font-medium mb-2 text-gray-700">Existing Images</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {existingImages.map((url, idx) => (
                <div key={idx} className="relative">
                  <img src={url} alt="gallery" className="h-24 w-32 object-cover rounded border" />
                  {!loading && (
                    <button
                      type="button"
                      onClick={() => removeExistingImage(url)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upload New Images */}
          <div className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="block text-sm font-medium mb-2 text-gray-700">Upload New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("galleryImage")}
              onChange={handleImageChange}
              className="mt-1 border px-3 py-2 rounded w-full cursor-pointer"
              disabled={loading}
            />

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="preview"
                    className="h-24 w-32 object-cover rounded border shadow-sm hover:shadow-md transition-transform hover:scale-105"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-md font-semibold text-white transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 shadow-md"
            }`}
          >
            {loading ? "Updating..." : "Update Gallery"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateGallery;
