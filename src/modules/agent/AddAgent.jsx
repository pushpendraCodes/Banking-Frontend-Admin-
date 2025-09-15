import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiAgentUrl, apiManagerUrl } from "../../api/apiRoutes";

const AddAgent = () => {
  const navigate = useNavigate();

  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    gender: "",
    managerId: "",
    // education: "",
    // alternateNumber: "",
  });

  // ✅ Managers list fetch
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const res = await axios.get(apiManagerUrl);
        setManagers(res.data.data || []);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    fetchManagers();
  }, []);

  // ✅ handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiAgentUrl}`, formData);
      alert("Agent added successfully ✅");
      navigate(-1);
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("Failed to add agent ❌");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fefaf5] p-4 rounded">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Add Agent</h2>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Form */}
      <div className="flex justify-center bg-yellow-50 p-6 mt-6 rounded shadow-sm max-w-3xl">
        <form className="space-y-4 w-100" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Agent Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Contact No.</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            />
          </div>

          {/* <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            />
          </div> */}

          {/* <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Alternate No</label>
            <input
              type="text"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            />
          </div> */}

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            />
          </div>

          {/* ✅ Gender Dropdown */}
          {/* <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div> */}

          {/* ✅ Manager Dropdown */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Manager</label>
            <select
              name="managerId"
              value={formData.managerId}
              onChange={handleChange}
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white"
            >
              <option value="">Select Manager</option>
              {managers.map((mng) => (
                <option key={mng._id} value={mng._id}>
                  {mng.name}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
