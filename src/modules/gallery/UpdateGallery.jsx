import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const UpdateGallery = () => {
  const navigate = useNavigate();
  const { id, itemId } = useParams();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const token = localStorage.getItem("token")

  // ✅ Load existing gallery item
  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}admin/gallery/get/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // ✅ Submit form
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

  // ✅ Remove an existing image
  const removeExistingImage = (url) => {
    setExistingImages(existingImages.filter((img) => img !== url));
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
        <h2 className="text-2xl font-bold">Update Gallery</h2>
      </div>

      <div className="max-w-5xl mx-auto mt-10 bg-[#ffffff] p-6 rounded">
        {loading && (
          <p className="text-center text-gray-500 mb-4">Loading...</p>
        )}

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
              placeholder="Enter category"
              disabled={loading}
            />
          </div>

          {/* Existing Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Existing Images</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {existingImages.map((url, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={url}
                    alt="gallery"
                    className="h-24 w-32 object-cover rounded border"
                  />
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
          <div className="mb-4">
            <label className="block text-sm font-medium">Upload New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("galleryImage")}
              onChange={handleImageChange}
              className="mt-1 border px-3 py-2 rounded"
              disabled={loading}
            />

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="preview"
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
            className={`${loading ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
              } text-white px-4 py-2 rounded`}
          >
            {loading ? "Updating..." : "Update Gallery"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateGallery;
