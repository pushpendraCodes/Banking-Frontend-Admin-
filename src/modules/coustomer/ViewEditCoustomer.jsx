import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiCustomerUrl, apiAgentUrl } from "../../api/apiRoutes";
import { useForm } from "react-hook-form";

const ViewEditCustomer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
      agentId: "",
      gender: "",
      password: ""
    }
  });

  useEffect(() => {
    // Fetch customer
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`${apiCustomerUrl}/${id}`);
        const customer = res.data?.data || res.data;
        reset({
          name: customer.name || "",
          email: customer.email || "",
          contact: customer.contact || "",
          address: customer.address || "",
          agentId: customer.agentId?._id,
          gender: customer.gender || "",
          password: ""
        });
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCustomer();
  }, [id, reset]);

  useEffect(() => {
    // Fetch agents
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

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await axios.put(`${apiCustomerUrl}/${id}`, data);
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-white py-10 px-4 flex justify-center items-center">
      <div className="w-full max-w-xl shadow-lg rounded-xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4 rounded-t-xl bg-gradient-to-r from-yellow-100 via-yellow-50 to-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-yellow-500 p-2 rounded-full border transition-colors"
              title="Back"
            >
              <FaArrowLeft />
            </button>
            <h2 className="text-xl font-semibold tracking-wide text-gray-900">
              Edit Customer
            </h2>
          </div>
          <button
            type="submit"
            form="editForm"
            disabled={isSubmitting || saving}
            className={`bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg shadow-sm active:scale-95 transition-all`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <form
          id="editForm"
          className="p-8 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Name */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be 2+ chars" },
              })}
              className={`w-full p-3 border ${
                errors.name ? "border-red-400" : "border-gray-200"
              } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format"
                }
              })}
              className={`w-full p-3 border ${
                errors.email ? "border-red-400" : "border-gray-200"
              } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          {/* Contact */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Contact
            </label>
            <input
              type="text"
              maxLength={10}
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact must be 10 digits"
                }
              })}
              className={`w-full p-3 border ${
                errors.contact ? "border-red-400" : "border-gray-200"
              } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Contact"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
            )}
          </div>
          {/* Address */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className={`w-full p-3 border ${
                errors.address ? "border-red-400" : "border-gray-200"
              } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>
          {/* Gender */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`w-full p-3 border ${
                errors.gender ? "border-red-400" : "border-gray-200"
              } rounded-lg bg-gray-50 outline-none duration-200`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
            )}
          </div>
          {/* Agent */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Agent
            </label>
            <select
              {...register("agentId", {
                required: "Agent selection required"
              })}
              className={`w-full p-3 border ${
                errors.agentId ? "border-red-400" : "border-gray-200"
              } rounded-lg bg-gray-50 outline-none duration-200`}
            >
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent._id}>
                  {agent.name}
                </option>
              ))}
            </select>
            {errors.agentId && (
              <p className="text-red-500 text-xs mt-1">{errors.agentId.message}</p>
            )}
          </div>
          {/* Password (not validated, optional!) */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 outline-none duration-200"
              placeholder="Enter Password (leave blank to keep unchanged)"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEditCustomer;
