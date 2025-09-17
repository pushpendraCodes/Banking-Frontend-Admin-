import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api"; 
import { apiAgentUrl } from "../../api/apiRoutes";

function ViewAgent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await api.get(`${apiAgentUrl}/${id}`);
        setAgent(res.data.data || res.data); // ✅ backend ke response ke hisaab se
      } catch (error) {
        console.error("Error fetching agent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading agent details...</p>;
  }

  if (!agent) {
    return <p className="text-center text-red-500">Agent not found ❌</p>;
  }

  return (
    <>
      <div className="bg-[#fefaf5] px-3 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-1 border-2 rounded-4xl"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-lg font-bold">View Agent</h2>
      </div>

      <div className="flex justify-center items-center flex-col bg-[#fff9f1] p-6 mt-6 rounded">
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
          <div className="w-130 flex flex-col text-sm text-gray-700">
            <div className="flex justify-between items-center mb-4 ">
              <span className="font-medium">Name :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {agent.name}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 ">
              <span className="font-medium">Email Address :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {agent.email}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 ">
              <span className="font-medium">Contact No. :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {agent.contact}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 ">
              <span className="font-medium">Address :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {agent.address}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 ">
              <span className="font-medium">Manager :</span>
              <span className="bg-gray-100 p-1 rounded-sm w-60 block">
                {agent.managerId?.name || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAgent;
