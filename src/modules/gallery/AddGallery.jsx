import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddGallery = () => {
  const navigate = useNavigate();
 
  const { register, handleSubmit, reset } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

const id = JSON.parse(localStorage.getItem("user"))._id

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", data.caption);
      formData.append("category", data.category);

      // ✅ multiple images allowed
      if (data.galleryImage && data.galleryImage.length > 0) {
        for (let file of data.galleryImage) {
          formData.append("galleryImage", file);
        }
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}admin/gallery/add/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
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

  // ✅ Show preview for multiple images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <>
      <div className="bg-[#fef7ef] flex items-center gap-2 mb-4 p-2 rounded">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-1 border-2 rounded-4xl"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold">Add Gallery</h2>
      </div>

      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Caption */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Caption</label>
            <input
              type="text"
              {...register("caption", { required: true })}
              className="mt-1 border px-3 py-2 rounded w-full"
              placeholder="Enter caption"
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Category</label>
            <input
              type="text"
              {...register("category", { required: true })}
              className="mt-1 border px-3 py-2 rounded w-full"
              placeholder="Enter category (e.g. events, products)"
              disabled={loading}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Gallery Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("galleryImage", { required: true })}
              onChange={handleImageChange}
              className="mt-1"
              disabled={loading}
            />

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Preview"
                    className="h-24 w-32 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
            } text-white px-6 py-2 rounded`}
          >
            {loading ? "Adding..." : "Add Gallery"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddGallery;
