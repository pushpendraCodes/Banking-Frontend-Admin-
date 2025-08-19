import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiAdminBannerUrl } from "../../api/apiRoutes";

const UpdateBanner = () => {
  const { id } = useParams(); // URL से bannerId
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  // 🔹 localStorage से पुराना banner data लाना
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      // user के अंदर banners निकालना
      let banners = [];
      if (Array.isArray(parsedUser)) {
        banners = parsedUser[0]?.banners || [];
      } else {
        banners = parsedUser.banners || [];
      }

      // id match करने वाला banner ढूंढना
      const bannerToEdit = banners.find(
        (banner, idx) => String(banner.id || idx) === id
      );

      if (bannerToEdit) {
        setImagePreview(bannerToEdit.image || bannerToEdit.imageUrl || null);
      }
    }
  }, [id]);

  // 🔹 Update करने का function
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      // 👉 Debugging के लिए console में log
      console.log("Submitting Banner Update:", {
        bannerId: id,
        file: data.image ? data.image[0] : null,
        apiUrl: `${apiAdminBannerUrl}/${id}`,
      });

      const token = localStorage.getItem("token");
      await axios.post(`${apiAdminBannerUrl}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Banner updated successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error updating banner:", error);
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
      <h2 className="text-2xl font-bold mb-4">Update Banner</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
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
          Update Banner
        </button>
      </form>
    </div>
  );
};

export default UpdateBanner;
