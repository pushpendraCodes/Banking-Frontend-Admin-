import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddCareer() {
          const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
  };

  return (
    <div className="min-h-screen bg-white  sm:p-6 md:p-8">
      <div className="max-w-screen-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#fef7ef] p-4 rounded  mb-6">
          <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
           <button onClick={() => navigate(-1)} className="text-black  p-1 border-2 rounded-4xl">
            <FaArrowLeft />
           </button>
          
            <span className="font-bold">Official Notification / Recruitment</span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div>
            <label className="block font-bold mb-1">Add Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-100 p-3 rounded outline-none text-sm sm:text-base"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block font-bold mb-1">Add Description</label>
            <textarea
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-100 p-3 rounded h-40 resize-none outline-none text-sm sm:text-base"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded font-medium transition-all"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
