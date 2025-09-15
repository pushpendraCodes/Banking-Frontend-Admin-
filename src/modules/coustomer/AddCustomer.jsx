import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiCustomerUrl, apiAgentUrl } from "../../api/apiRoutes";

const AddCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    gender: "",
    password: "",
    agentId: "", // ✅ correct key
  });

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁 toggle state

  // Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(apiAgentUrl);
        setAgents(res.data.data || []);
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };
    fetchAgents();
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save (POST API call)
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(apiCustomerUrl, formData);
      if (res.status === 201 || res.status === 200) {
        alert("Customer added successfully!");
        navigate(-1);
      }
    } catch (err) {
      console.error("Error adding customer:", err.response?.data || err.message);
      alert("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fff9f1] p-4 rounded">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-black p-1 border-2 rounded-4xl"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Add Customer</h2>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            form="customerForm"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center bg-[#fff9f1] p-6 mt-6 rounded">
        <form id="customerForm" className="space-y-4 w-100" onSubmit={handleSave}>
          {/* Name */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter Name"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Contact */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Enter Contact"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Address */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter Address"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password with Eye */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Password</label>
            <div className="flex-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter Password"
                className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Agent Dropdown */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Agent</label>
            <select
              name="agentId"
              value={formData.agentId}
              onChange={handleChange}
              required
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            >
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
