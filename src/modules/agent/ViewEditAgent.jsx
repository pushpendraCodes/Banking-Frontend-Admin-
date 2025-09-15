import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiAgentUrl } from "../../api/apiRoutes";

const ViewEditAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅get  agent id form URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    education: "",
    alternateNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Agent Data Fetch
  useEffect(() => {
    axios
      .get(`${apiAgentUrl}/${id}`)
      .then((res) => {
        console.log("Fetched Agent:", res.data);

        // ✅  API response structure { success: true, data: {...} } है
        const agent = res.data.data || res.data;

        // API  data prefill
        setFormData({
          name: agent.name || "",
          email: agent.email || "",
          contact: agent.contact || "",
          address: agent.address || "",
          education: agent.education || "",
          alternateNumber: agent.alternateNumber || "",
          password: agent.password || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching agent:", err);
        alert("Failed to load agent data ❌");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Save (Edit API)
  const handleSave = async () => {
    try {
      await axios.put(
        `${apiAgentUrl}/${id}`,
        formData
      );
      alert("Agent updated successfully ✅");
      navigate(-1); // back to list
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update agent ❌");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fefaf5] p-4 rounded">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">View/Edit Agent</h2>
        </div>
        <button
          onClick={handleSave}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded"
        >
          Update
        </button>
      </div>

      {/* Form */}
      <div className="bg-yellow-50 p-6 mt-6 rounded shadow-sm max-w-3xl">
        <form className="space-y-4">
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Agent Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Contact No.</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Alternate No.</label>
            <input
              type="text"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Password</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEditAgent;
