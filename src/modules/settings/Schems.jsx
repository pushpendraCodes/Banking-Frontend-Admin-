import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Schems = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate()
  const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}admin/get`);
        if (res.data.success) {
          setSchemes(res.data.data.schemes); // assuming { success:true, data:[...] }
        } else {
          alert(res.data.message || "Failed to fetch schemes");
        }
      } catch (error) {
        console.error("Error fetching schemes:", error);
        alert("Something went wrong while fetching schemes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  const handleAddScheme = () => {
    // Add your navigation logic here
    console.log("Navigate to add scheme page");
    Navigate("/settings/forms/schemes/add")
  };

  const handleEditScheme = (scheme) => {
    // Add your edit logic here
    Navigate(`/settings/forms/schemes/update/${scheme._id}`)
    console.log("Edit scheme:", scheme);
  };

  const handleDeleteScheme = async (scheme) => {
    if (window.confirm("Are you sure you want to delete this scheme?")) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}admin/schemes/delete/${scheme._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.success) {
          alert("Scheme deleted successfully!");

          // remove scheme from state so UI updates immediately
          setSchemes((prev) => prev.filter((s) => s._id !== scheme._id));
        } else {
          alert(response.data.message || "Failed to delete scheme");
        }
      } catch (error) {
        console.error("Error deleting scheme:", error);
        alert("Something went wrong while deleting the scheme.");
      }
    }
  };


  const handleViewScheme = (scheme) => {
    // Add your view logic here
    console.log("View scheme details:", scheme);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Loading schemes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header with Add Button */}
      <div className="flex justify-between rounded-md bg-gradient-to-br from-orange-500 via-red-500 to-red-600 p-3 items-center mb-6">
        <div className="flex gap-2  items-center">

          <button
            onClick={() => Navigate(-1)}
            className="flex items-center text-white hover:text-red-700 mr-4"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h2 className="text-2xl font-bold text-white">
            Available Schemes
          </h2>
        </div>
        <button
          onClick={handleAddScheme}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Scheme
        </button>
      </div>

      {schemes.length === 0 ? (
        <p className="text-center text-gray-500">No schemes found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
            >
              {/* Logo */}
              {scheme.logo && (
                <img
                  src={scheme.logo}
                  alt={scheme.name}
                  className="w-20 h-20 object-contain mx-auto mb-4"
                />
              )}

              {/* Name */}
              <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">
                {scheme.name}
              </h3>

              {/* Description - Truncated */}
              <p className="text-sm text-gray-600 text-center mb-4 line-clamp-3">
                {scheme.desc?.length > 100
                  ? `${scheme.desc.substring(0, 100)}...`
                  : scheme.desc}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-2 mb-4">
                {/* <button
                  onClick={() => handleViewScheme(scheme)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                  title="View Details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button> */}
                <button
                  onClick={() => handleEditScheme(scheme)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-md transition"
                  title="Edit Scheme"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteScheme(scheme)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                  title="Delete Scheme"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* PDF Link */}
              {scheme.pdf && (
                <div className="text-center">
                  <a
                    href={scheme.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Schems;