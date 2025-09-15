import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiAdminBannerUrl } from "../../api/apiRoutes";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const UpdateBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // yaha id = bannerId (na ki adminId)
  const { register, handleSubmit, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let imageUrl = "";

      // CASE 1: direct URL
      if (data.imageUrl && data.imageUrl.trim() !== "") {
        imageUrl = data.imageUrl.trim();
      }
      // CASE 2: file upload
      else if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "your-upload-preset"); 
        formData.append("cloud_name", "your-cloud-name");

        const uploadRes = await axios.post(
          // "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload",
          `${apiAdminBannerUrl}/${id}`,
          formData
        );

        imageUrl = uploadRes.data.secure_url;
      } else {
        alert("Please provide either an image file or an image URL!");
        return;
      }

      // STEP 2: call backend
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiAdminBannerUrl}/${id}`,  // 🔥 banner ki ID use karo
        {
          imageUrl: imageUrl,
          isActive: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdatedData(res.data);
      alert("Banner updated successfully!");
      reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Error updating banner:", error.response?.data || error);
      alert("Something went wrong! Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (<>
<div className="bg-[#fef7ef] flex items-center gap-2 mb-4 p-2 rounded">
                      <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
                        <FaArrowLeft />
                      </button>
                      <h2 className="text-2xl font-bold ">Website Banner</h2>
       </div>

{/* .......... */}
    <div className="max-w-5xl mx-auto mt-10 p-6 " >
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Select Banner Type:</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={(e) =>
            setImagePreview(URL.createObjectURL(e.target.files[0]))
          }
           placeholder="Select"
          className="block border px-1 py-2 mt-3 mb-5 rounded border-gray-200"
        />

        <label>Bammer Image:</label>
        <input
          type="text"
          placeholder="Choose file"
          {...register("imageUrl")}
         className="block mt-1 border px-1 py-2 mb-5 rounded"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            width="200"
            height="100"
            style={{ marginBottom: "10px", objectFit: "cover" }}
          />
        )}

        <button
         className="bg-yellow-400 py-1 px-9 rounded text-white hover:bg-yellow-500"
         type="submit" 
         disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {updatedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Updated Banner Response:</h3>
          <pre>{JSON.stringify(updatedData, null, 2)}</pre>
        </div>
      )}
    </div>
  </>
  );
};

export default UpdateBanner;
