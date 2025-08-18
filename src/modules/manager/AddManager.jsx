import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiManagerUrl } from "../../api/apiRoutes";


const AddManager = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    education: "",
    alternateNumber: "",
    password: "",
    gender: "Male",
    branch: "689b122d06150f8387e11c14", // aap API me jo branch dena ho
    bank: "Maa Anusaya Urban", // fix ya select option se
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiManagerUrl}/register`,
        formData
      );
      alert("Manager added successfully ✅");
      navigate(-1); // back le jane ke liye
    } catch (err) {
      console.error(err);
      alert("Error while adding manager ❌");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fefaf5] p-4 rounded">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-black">
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Add Manager</h2>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Form */}
      <div className="bg-yellow-50 p-6 mt-6 rounded shadow-sm max-w-3xl">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Name</label>
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
              type="password"
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

export default AddManager;
