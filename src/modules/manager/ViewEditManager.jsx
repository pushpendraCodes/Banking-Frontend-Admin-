import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {  apiManagerUrl } from "../../api/apiRoutes";

const ViewEditManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    education: "",
    alternateNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${apiManagerUrl}/${id}`)
      .then((res) => {
        const data = res.data?.data || res.data; // backend ke structure ke hisab se
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          address: data.address || "",
          education: data.education || "",
          alternateNumber: data.alternateNumber || "",
          password: data.password || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching manager:", err);
        alert("Failed to fetch manager data.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Input change handler
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save handler
  const handleSave = () => {
    setSaving(true);
    axios
      .put(`${apiManagerUrl}/${id}`, formData)
      .then(() => {
        alert("Manager updated successfully!");
        navigate(-1);
      })
      .catch((err) => {
        console.error("Error updating manager:", err);
        alert("Failed to update manager.");
      })
      .finally(() => setSaving(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading manager data...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fefaf5] p-4 rounded">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Edit Manager</h2>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`${
            saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500"
          } text-white font-semibold px-5 py-2 rounded`}
        >
          {saving ? "Update..." : "Update"}
        </button>
      </div>

      {/* Form */}
      <div className="bg-yellow-50 p-6 mt-6 rounded shadow-sm max-w-3xl">
        <form className="space-y-4">
          {[
            { label: "Manager Name", name: "name", type: "text" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Contact No.", name: "contact", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Education", name: "education", type: "text" },
            { label: "Alternate No.", name: "alternateNumber", type: "text" },
            { label: "Password", name: "password", type: "text" },
          ].map((field) => (
            <div className="flex items-center" key={field.name}>
              <label className="w-40 font-medium text-sm">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default ViewEditManager;
