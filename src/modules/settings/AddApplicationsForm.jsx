import React, { useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddApplicationForm() {
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("user"))._id;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // New React Quill state
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
const token = localStorage.getItem("token")
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a document");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc); // Append description
      formData.append("docs", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/loan-application/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (res.data.success) {
        alert("Application uploaded successfully!");
        navigate(-1);
      } else {
        alert(res.data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = () => {
    if (!file) return null;

    const fileURL = URL.createObjectURL(file);

    if (file.type === "application/pdf") {
      return (
        <embed
          src={fileURL}
          type="application/pdf"
          width="100%"
          height="100%"
          className="rounded"
        />
      );
    }

    if (file.type.startsWith("image/")) {
      return (
        <img
          src={fileURL}
          alt="Preview"
          className="w-full h-full object-cover rounded"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 text-center p-2">
        File selected: {file.name}
      </p>
    );
  };

  return (
    <div className="bg-white min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fef7ef] p-4 rounded shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <button
            onClick={() => navigate(-1)}
            className="text-black p-1 border-2 rounded-4xl"
          >
            <FaArrowLeft />
          </button>
          <span>New Loan Application</span>
        </div>
      </div>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        {/* Title Field */}
        <div>
          <label className="block font-semibold mb-1">Add Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded outline-none"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={setDesc}
            placeholder="Enter description..."
            className="bg-gray-100 rounded"
          />
        </div>

        {/* Document Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Document</label>
          <label
            htmlFor="upload"
            className="w-40 h-48 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition overflow-hidden"
          >
            {file ? (
              renderPreview()
            ) : (
              <div className="text-center text-gray-500">
                <FaCloudUploadAlt className="text-2xl mx-auto mb-1" />
                <p className="text-sm">Upload File</p>
              </div>
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
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
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded font-medium disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
