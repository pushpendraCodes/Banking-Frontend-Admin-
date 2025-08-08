import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddGallery = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image[0]);

      const res = await axios.post("/api/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Gallery added successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error uploading gallery:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-[#fef7ef] p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Gallery</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Gallery Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="mt-1  border px-3 py-2 rounded"
            placeholder="Enter title"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Gallery Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={handleImageChange}
            className="mt-1"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-40 object-cover rounded"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Gallery
        </button>
      </form>
    </div>
  );
};

export default AddGallery;
