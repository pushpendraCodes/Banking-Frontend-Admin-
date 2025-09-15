import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { apiCustomerUrl } from "../../api/apiRoutes";

const AddCustomer = () => {
  const navigate = useNavigate();

  // ✅ Controlled form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    agent: "",
    // amount: "",
    // duration: "",
    // pending: "",
  });

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save (POST API call)
  const handleSave = async (e) => {
    e.preventDefault(); // 🚀 prevent page refresh

    try {
      const res = await axios.post(
        `${apiCustomerUrl}`,
        formData
      );

      if (res.status === 201 || res.status === 200) {
        alert("Customer added successfully!");
        navigate(-1); // Back to previous page
      }
    } catch (err) {
      console.error("Error adding customer:", err.response?.data || err.message);
      alert("Failed to add customer");
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fff9f1] p-4 rounded">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Add Customer</h2>
        </div>
          {/* ✅ Save button inside form */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded"
            >
              Save
            </button>
          </div>
      </div>

      {/* Form */}
      <div className="flex justify-center bg-[#fff9f1] p-6 mt-6 rounded">
        <form className="space-y-4 w-100" onSubmit={handleSave}>
          {[
            { label: "Name", key: "name", type: "text" },
            { label: "Email Address", key: "email", type: "email" },
            { label: "Contact No.", key: "contact", type: "text" },
            { label: "Address", key: "address", type: "text" },
            { label: "Agent", key: "agent", type: "text" },
            // { label: "Amount", key: "amount", type: "text" },
            // { label: "Duration", key: "duration", type: "text" },
            // { label: "Pending", key: "pending", type: "text" },
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

          {/* ✅ Save button inside form */}
          {/* <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded"
            >
              Save
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
