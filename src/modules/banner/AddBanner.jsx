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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image[0]);

      const res = await axios.post(`$${apiAdminBannerUrl}`, formData, {
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

  return (<>
  <div className="bg-[#fef7ef] flex items-center gap-2 mb-4 p-2 rounded">
                      <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
                        <FaArrowLeft />
                      </button>
                      <h2 className="text-2xl font-bold ">Website Banner</h2>
       </div>
    <div className="max-w-5xl mx-auto mt-10 p-6 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Select Banner Type</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="mt-1  border px-3 py-2 rounded"
            placeholder="Select"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Banner Images</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={handleImageChange}
            className="mt-1 border px-3 py-2 rounded"
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
          className="bg-yellow-400 text-white px-9 py-1 rounded hover:bg-yellow-500"
        >
          Add
        </button>
      </form>
    </div>
  </>

  );
};

export default AddBanner;
