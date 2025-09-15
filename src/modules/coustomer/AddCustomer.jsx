import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiCustomerUrl, apiAgentUrl } from "../../api/apiRoutes"; // 👈 apiAgentUrl bhi add karo

const AddCustomer = () => {
  const navigate = useNavigate();

  // ✅ Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    address: "",
    gender: "",
    agentId: "",
  });

  const [agents, setAgents] = useState([]); // ✅ Agents list

  // ✅ Fetch agents from API
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(apiAgentUrl);
        if (res.data?.data) {
          setAgents(res.data.data); // API se agents list set
        }
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };
    fetchAgents();
  }, []);

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save (POST API call)
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(apiCustomerUrl, formData);

      if (res.status === 201 || res.status === 200) {
        alert("Customer added successfully!");
        navigate(-1);
      }
    } catch (err) {
      console.error("Error adding customer:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add customer");
    }
  };

  return (
    <div className="">
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

        {/* ✅ Header Save button works */}
        <div className="flex justify-end">
          <button
            type="submit"
            form="addCustomerForm"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex justify-center bg-[#fff9f1] p-6 mt-6 rounded">
        <form
          id="addCustomerForm"
          className="space-y-4 w-100"
          onSubmit={handleSave}
        >
          {[
            { label: "Name", key: "name", type: "text" },
            { label: "Email Address", key: "email", type: "email" },
            { label: "Contact No.", key: "contact", type: "text" },
            { label: "Password", key: "password", type: "password" },
            { label: "Address", key: "address", type: "text" },
          ].map((field) => (
            <div key={field.key} className="flex items-center">
              <label className="w-40 font-medium text-sm">{field.label}</label>
              <input
                type={field.type}
                name={field.key}
                value={formData[field.key]}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
              />
            </div>
          ))}

          {/* Gender dropdown */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ✅ Agent dropdown */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Agent</label>
            <select
              name="agentId"
              value={formData.agentId}
              onChange={handleChange}
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
