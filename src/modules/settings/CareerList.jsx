import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPen } from "react-icons/fa6";
// import { apiAdminCareerUrl } from "../../api/apiRoutes"; // adjust your API route

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}admin/get`);
        // Assuming API returns { success: true, data: admin } where admin.careers = [...]
        if (res.data  ) {
          setCareers(res.data.data.careers || []);
        }
      } catch (err) {
        console.error("Error fetching careers:", err);
        alert("Failed to fetch careers");
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const onDelete = async (careerId) => {
    if (!window.confirm("Are you sure you want to delete this career?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}admin/career/${careerId}`);
      setCareers((prev) => prev.filter((c) => c._id !== careerId));
      alert("Career deleted successfully!");
    } catch (err) {
      console.error("Error deleting career:", err);
      alert("Failed to delete career");
    }
  };

const navigate = useNavigate()

  return (
    <div className="sm:p-6 lg:p-8">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Official Notification / Recruitment
        </h2>
        <Link
          to="/settings/add-career"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm sm:text-base"
        >
          Add Recruitment / Notification
        </Link>
      </div>

      {/* Loading */}
      {loading && <p className="text-gray-500">Loading careers...</p>}

      {/* Career Grid */}
      {!loading && careers.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {careers.map((career) => (
            <div
              key={career._id}
              className="bg-white border rounded-lg shadow-sm p-4 relative hover:shadow-md transition"
            >
              {/* Delete Button */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => onDelete(career._id)}
                aria-label="Delete career"
              >
                <FaTrashAlt />
              </button>

               <button
                className="absolute top-2 right-10 text-green-500 hover:text-green-700"
                onClick={() =>
                  navigate(`/settings/add-career/${career._id}`)
                }
                aria-label="Edit career"
              >
                <FaPen />
              </button>

 
              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 break-words">
                {career.title || "—"}
              </h3>

              {/* Description */}
              {/* <p className="text-gray-700 text-sm mb-2">
                {career.desc || "—"}
              </p> */}

              {/* Contact Info */}
              {career.contactPerson && (
                <p className="text-gray-600 text-sm mb-1">
                  Contact: {career.contactPerson}
                </p>
              )}
              {career.email && (
                <p className="text-gray-600 text-sm mb-1">Email: {career.email}</p>
              )}
              {career.location && (
                <p className="text-gray-600 text-sm mb-1">
                  Location: {career.location}
                </p>
              )}

              {/* Documents / Link */}
              {career.docs && (
                <a
                  href={career.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:underline text-sm mt-2"
                >
                  View Document
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerList;
