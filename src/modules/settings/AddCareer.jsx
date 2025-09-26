import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { apiAdminCareerUrl } from "../../api/apiRoutes";

export default function AddEditCareer() {
  const navigate = useNavigate();
  const { itemId } = useParams(); // if editing, itemId will exist
  const adminId = JSON.parse(localStorage.getItem("user"))?._id;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [docs, setDocs] = useState(null);
  const [existingDocs, setExistingDocs] = useState(null); // show existing docs
  const [loading, setLoading] = useState(false);
const token = localStorage.getItem("token")
  // Fetch career data if editing
  useEffect(() => {
    const fetchCareer = async () => {
      if (!itemId) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}admin/career/get/${itemId}`);
        if (res.data ) {
          const c = res.data.data;
          setTitle(c.title || "");
          setDesc(c.desc || "");
          setContactPerson(c.contactPerson || "");
          setEmail(c.email || "");
          setLocation(c.location || "");
          setExistingDocs(c.docs || null);
        }
      } catch (err) {
        console.error("Error fetching career:", err.response?.data || err);
        alert("Failed to fetch career data");
      }
    };
    fetchCareer();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Title and Description are required!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("contactPerson", contactPerson);
      formData.append("email", email);
      formData.append("location", location);
      if (docs) formData.append("careerDocs", docs);

      if (itemId) {
        // Edit existing career
        await axios.put(`${import.meta.env.VITE_API_URL}admin/career/${adminId}/${itemId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" ,Authorization: `Bearer ${token}`},
        });
        alert("Career updated successfully!");
      } else {
        // Add new career
        await axios.post(`${import.meta.env.VITE_API_URL}admin/career/${adminId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" ,Authorization: `Bearer ${token}`},
        });
        alert("Career added successfully!");
      }

      navigate("/settings/recruitment");
    } catch (err) {
      console.error("Error saving career:", err.response?.data || err);
      alert("Failed to save career");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white sm:p-6 md:p-8">
      <div className="max-w-screen-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#fef7ef] p-4 rounded mb-6">
          <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
            <button
              onClick={() => navigate(-1)}
              className="text-black p-1 border-2 rounded-4xl"
            >
              <FaArrowLeft />
            </button>
            <span className="font-bold">
              {itemId ? "Edit Career / Notification" : "Add Career / Notification"}
            </span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-bold mb-1">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full bg-gray-100 p-3 rounded outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Description *</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter description"
              className="w-full bg-gray-100 p-3 rounded h-32 resize-none outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Contact Person</label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="Enter contact person"
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              className="w-full bg-gray-100 p-3 rounded outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Attach Document</label>
            <input
              type="file"
              onChange={(e) => setDocs(e.target.files[0])}
              className="w-full mt-1"
            />
            {existingDocs && !docs && (
              <p className="text-sm text-gray-600 mt-1">
                Existing document:{" "}
                <a
                  href={existingDocs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded font-medium transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (itemId ? "Updating..." : "Uploading...") : itemId ? "Update Career" : "Add Career"}
          </button>
        </form>
      </div>
    </div>
  );
}
