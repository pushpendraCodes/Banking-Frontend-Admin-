import React, { useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LegalDocumentsAdd() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const id = JSON.parse(localStorage.getItem("user"))._id;
const token = localStorage.getItem("token")
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("legaldocs", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/legal-docs/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
          },
        }
      );

      if (res.data.success) {
        alert("Document uploaded successfully!");
        navigate(-1);
      } else {
        alert(res.data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!file) return null;

    if (file.type === "application/pdf") {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full text-red-500">
          <FaFilePdf className="text-4xl mb-2" />
          <p className="text-sm">PDF Selected</p>
        </div>
      );
    }

    if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="w-full h-full object-cover rounded"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 text-center">
        Unsupported file type
      </p>
    );
  };

  return (
    <div className="bg-white p-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#dc5212] p-4 rounded">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <button
            onClick={() => navigate(-1)}
            className="text-black p-1 border-2 rounded-4xl"
          >
            <FaArrowLeft />
          </button>
          <span className="font-bold">New Legal Document</span>
        </div>
      </div>

      <form className="mt-6 space-y-6 p-4" onSubmit={handleSubmit}>
        {/* Title Field */}
        <div>
          <label className="block font-bold mb-1">Add Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded outline-none"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-bold mb-2">Upload Document</label>

          <label
            htmlFor="upload"
            className="w-40 h-48 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition"
          >
            {file ? (
              renderPreview()
            ) : (
              <div className="text-center text-gray-500">
                <FaCloudUploadAlt className="text-2xl mx-auto mb-1" />
                <p className="text-sm">Upload Image / PDF</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*,application/pdf"
              id="upload"
              onChange={handleFileChange}
              className="hidden"
              required
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded font-medium"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default LegalDocumentsAdd;
