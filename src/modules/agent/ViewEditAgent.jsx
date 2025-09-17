import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiAgentUrl, apiManagerUrl } from "../../api/apiRoutes";

const ViewEditAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ get agent id from URL

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    gender: "",
    address: "",
    password: "",
    managerId: "",
  });

  const [loading, setLoading] = useState(true);
  const [managers, setManagers] = useState([]); // ✅ manager list
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle state

  // 🔹 Fetch agent data
  useEffect(() => {
    axios
      .get(`${apiAgentUrl}/${id}`)
      .then((res) => {
        const agent = res.data.data || res.data;
        setFormData({
          name: agent.name || "",
          email: agent.email || "",
          contact: agent.contact || "",
          address: agent.address || "",
          gender: agent.gender || "",
          managerId: agent.managerId?._id || "",
          password: "",
        });
      })
      .catch((err) => {
        console.error("Error fetching agent:", err);
        alert("Failed to load agent data ❌");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // 🔹 Fetch managers list
  useEffect(() => {
    axios
      .get(apiManagerUrl)
      .then((res) => {
        setManagers(res.data.data || res.data);
      })
      .catch((err) => {
        console.error("Error fetching managers:", err);
      });
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Save (PUT API)
  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        address: formData.address,
        gender: formData.gender,
        managerId: formData.managerId,
      };

      if (formData.password !== "") {
        payload.password = formData.password;
      }

      console.log("Sending payload:", payload);

      await axios.put(`${apiAgentUrl}/${id}`, payload);
      alert("Agent updated successfully ✅");
      navigate(-1);
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      alert("Failed to update agent ❌");
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

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
          {/* Agent Name */}
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

          {/* Email */}
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

          {/* Contact */}
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

          {/* ✅ Gender Dropdown */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* ✅ Manager Dropdown */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Manager</label>
            <select
              name="managerId"
              value={formData.managerId}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            >
              <option value="">-- Select Manager --</option>
              {managers.map((mng) => (
                <option key={mng._id} value={mng._id}>
                  {mng.name}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Password with eye toggle */}
          <div className="flex items-center relative">
            <label className="w-40 font-medium text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100 pr-10"
              placeholder="Enter new password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEditAgent;
