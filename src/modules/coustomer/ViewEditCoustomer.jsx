import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiCustomerUrl } from "../../api/apiRoutes";

const ViewEditCoustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL से customer id ले रहे हैं

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

  const [loading, setLoading] = useState(true);

  // ✅ API से customer का data लाना
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(
          `${apiCustomerUrl}/${id}`
        );

        // अगर आपका API response nested है तो इसको adjust करना पड़ेगा
        const customer = res.data?.data || res.data; 

        setFormData({
          name: customer.name || "",
          email: customer.email || "",
          contact: customer.contact || "",
          address: customer.address || "",
          agent: customer.agent || "",
          // amount: customer.amount || "",
          // duration: customer.duration || "",
          // pending: customer.pending || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching customer:", err);
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save button → Update API
  const handleSave = async () => {
    try {
      await axios.put(
        `${apiCustomerUrl}/${id}`,
        formData
      );
      alert("Customer updated successfully!");
      navigate(-1); // वापस लिस्ट पेज पर
    } catch (err) {
      console.error("Error updating customer:", err);
      alert("Failed to update customer");
    }
  };

  if (loading) {
    return <p className="p-4">Loading customer data...</p>;
  }

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fefaf5] p-4 rounded">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Edit Customer</h2>
        </div>
        <button
          onClick={handleSave}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Form */}
      <div className="flex justify-center bg-[#fff9f1] p-6 mt-6 rounded ">
        <form className="space-y-4 w-100">
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
                className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
              />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default ViewEditCoustomer;
