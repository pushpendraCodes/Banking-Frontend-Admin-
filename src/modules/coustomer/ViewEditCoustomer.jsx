import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiCustomerUrl, apiAgentUrl } from "../../api/apiRoutes";

const ViewEditCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    agentId: "",
    gender: "",
    password: "",
  });

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch customer by ID
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`${apiCustomerUrl}/${id}`);
        const customer = res.data?.data || res.data;

        setFormData({
          name: customer.name || "",
          email: customer.email || "",
          contact: customer.contact || "",
          address: customer.address || "",
          agentId: customer.agentId._id,
          gender: customer.gender || "",
          // password: customer.password || "",
        });
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  // ✅ Fetch agents for dropdown
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await axios.get(apiAgentUrl);
        setAgents(res.data?.data || res.data);
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };
    fetchAgents();
  }, []);

  // ✅ Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Update customer
  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${apiCustomerUrl}/${id}`, formData);
      alert("Customer updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error updating customer:", err);
      alert("Failed to update customer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-4">Loading customer data...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fefaf5] p-4 rounded">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-black p-1 border-2 rounded-4xl"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Edit Customer</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${
            saving ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
          } text-white font-semibold px-5 py-2 rounded`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Form */}
      <div className="flex justify-center bg-[#fff9f1] p-6 mt-6 rounded ">
        <form className="space-y-4 w-100">
          {/* Name */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Contact */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Contact No.</label>
            <input
              type="text"
              name="contact"
              required
              value={formData.contact}
              onChange={handleChange}
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
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Gender</label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Agent */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Agent</label>
            <select
              name="agentId"
              required
              value={formData.agentId}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            >
              <option value="">-- Select Agent --</option>
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

export default ViewEditCustomer;
