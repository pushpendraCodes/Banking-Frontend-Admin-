import React, { useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddApplicationForm() {
        const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle upload logic (FormData, API call, etc.)
    console.log("Title:", title);
    console.log("File:", file);
  };

  return (
    <div className=" bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fef7ef] p-4 rounded shadow-sm">
        <div className="flex items-center gap-2 text-lg font-semibold">
         <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
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

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Document</label>

          <label
            htmlFor="upload"
            className="w-40 h-48 flex items-center justify-center bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition"
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover rounded"
              />
            ) : (
              <div className="text-center text-gray-500">
                <FaCloudUploadAlt className="text-2xl mx-auto mb-1" />
                <p className="text-sm">Upload Image</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
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
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded font-medium"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
