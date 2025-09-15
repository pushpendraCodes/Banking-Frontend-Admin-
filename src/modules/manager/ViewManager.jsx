import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api"; // ✅ apna axios instance import karna (src/api/api.js se)

function ViewManager() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ URL se id le rahe hai
  const [manager, setManager] = useState(null); // manager ka data yaha aayega
  const [loading, setLoading] = useState(true);

  // ✅ API Call
  useEffect(() => {
    const fetchManager = async () => {
      try {
        const res = await api.get(`/manager/${id}`); // API endpoint (check backend route)
        setManager(res.data.data || res.data); // response ke hisaab se adjust karein
      } catch (error) {
        console.error("Error fetching manager data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManager();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!manager) {
    return <p className="text-center mt-10 text-red-500">Manager not found!</p>;
  }

  return (
    <>
      {/* Header */}
      <div className="bg-[#fefaf5] px-3 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-1 border-2 rounded-4xl"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-bold">View Manager</h2>
      </div>

      {/* Content */}
      <div className="flex justify-center items-center flex-col bg-[#fff9f1] p-6 mt-6 rounded">
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
          <div className="w-130 flex flex-col text-sm text-gray-700">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Name :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {manager.name}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Email Address :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {manager.email}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Contact No. :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {manager.contact}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Address :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {manager.address}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Agent :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {manager.agent_name || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Manager :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {manager.manager_name || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewManager;
