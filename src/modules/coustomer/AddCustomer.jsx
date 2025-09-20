import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiCustomerUrl, apiAgentUrl } from "../../api/apiRoutes";
import { useForm, Controller } from "react-hook-form";

const AddCustomer = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const [agents, setAgents] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(apiCustomerUrl, data);
      if (res.status === 201 || res.status === 200) {
        alert("Customer added successfully!");
        navigate(-1);
      }
    } catch (err) {
      console.error("Error adding customer:", err.response?.data || err.message);
      alert("Failed to add customer");
    }
  };

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
              Add Customer
            </h2>
          </div>
          <button
            form="customerForm"
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg shadow-sm active:scale-95 transition-all"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
        <form
          id="customerForm"
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 flex flex-col gap-6"
        >
          {/* NAME */}
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
              placeholder="Enter Name"
              className={`w-full p-3 border ${
                errors.name
                  ? "border-red-400"
                  : "border-gray-200 focus:border-yellow-400"
              } rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* EMAIL */}
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
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter Email"
              className={`w-full p-3 border ${
                errors.email
                  ? "border-red-400"
                  : "border-gray-200 focus:border-yellow-400"
              } rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          {/* CONTACT */}
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
                  message: "Contact must be 10 digits",
                },
              })}
              placeholder="Enter Contact"
              className={`w-full p-3 border ${
                errors.contact
                  ? "border-red-400"
                  : "border-gray-200 focus:border-yellow-400"
              } rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
            )}
          </div>
          {/* ADDRESS */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Enter Address"
              className={`w-full p-3 border ${
                errors.address
                  ? "border-red-400"
                  : "border-gray-200 focus:border-yellow-400"
              } rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>
          {/* GENDER */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`w-full p-3 border ${
                errors.gender
                  ? "border-red-400"
                  : "border-gray-200 focus:border-yellow-400"
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
          {/* PASSWORD */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Password
            </label>
            <div className="relative">
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be ≥6 chars",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className={`w-full p-3 border ${
                      errors.password
                        ? "border-red-400"
                        : "border-gray-200 focus:border-yellow-400"
                    } rounded-lg bg-gray-50 pr-10 outline-none duration-200`}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* AGENT */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Agent
            </label>
            <select
              {...register("agentId", { required: "Agent selection required" })}
              className={`w-full p-3 border ${
                errors.agentId
                  ? "border-red-400"
                  : "border-gray-200 focus:border-yellow-400"
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
              <p className="text-red-500 text-xs mt-1">
                {errors.agentId.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
