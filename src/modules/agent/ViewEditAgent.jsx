import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiAgentUrl, apiManagerUrl } from "../../api/apiRoutes";
import { useForm, Controller } from "react-hook-form";

const ViewEditAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [managers, setManagers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      email: "",
      gender: "",
      address: "",
      password: "",
      managerId: "",
    }
  });

  useEffect(() => {
    // Fetch agent
    axios
      .get(`${apiAgentUrl}/${id}`)
      .then((res) => {
        const agent = res.data.data || res.data;
        reset({
          name: agent.name || "",
          contact: agent.contact || "",
          email: agent.email || "",
          gender: agent.gender || "",
          address: agent.address || "",
          password: "",
          managerId: agent.managerId?._id || "",
        });
      })
      .catch((err) => {
        console.error("Error fetching agent:", err);
        alert("Failed to load agent data ❌");
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  useEffect(() => {
    axios
      .get(apiManagerUrl)
      .then((res) => setManagers(res.data.data || res.data))
      .catch((err) => console.error("Error fetching managers:", err));
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      contact: data.contact,
      address: data.address,
      gender: data.gender,
      managerId: data.managerId,
    };
    if (data.password) {
      payload.password = data.password;
    }
    try {
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
              View/Edit Agent
            </h2>
          </div>
          <button
            type="submit"
            form="editAgentForm"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg shadow-sm active:scale-95 transition-all"
            disabled={isSubmitting}
          >
            Update
          </button>
        </div>
        <form
          id="editAgentForm"
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 flex flex-col gap-6"
        >
          {/* Agent Name */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Agent Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be 2+ chars" }
              })}
              placeholder="Enter Name"
              className={`w-full p-3 border ${errors.name ? "border-red-400" : "border-gray-200 focus:border-yellow-400"} rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.name && (<p className="text-red-500 text-xs mt-1">{errors.name.message}</p>)}
          </div>
          {/* Email */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format"
                }
              })}
              placeholder="Enter Email"
              className={`w-full p-3 border ${errors.email ? "border-red-400" : "border-gray-200 focus:border-yellow-400"} rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.email && (<p className="text-red-500 text-xs mt-1">{errors.email.message}</p>)}
          </div>
          {/* Contact */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Contact No.</label>
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
              placeholder="Enter Contact"
              className={`w-full p-3 border ${errors.contact ? "border-red-400" : "border-gray-200 focus:border-yellow-400"} rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.contact && (<p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>)}
          </div>
          {/* Address */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              placeholder="Enter Address"
              className={`w-full p-3 border ${errors.address ? "border-red-400" : "border-gray-200 focus:border-yellow-400"} rounded-lg bg-gray-50 outline-none duration-200`}
            />
            {errors.address && (<p className="text-red-500 text-xs mt-1">{errors.address.message}</p>)}
          </div>
          {/* Gender Dropdown */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`w-full p-3 border ${errors.gender ? "border-red-400" : "border-gray-200 focus:border-yellow-400"} rounded-lg bg-gray-50 outline-none duration-200`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (<p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>)}
          </div>
          {/* Manager Dropdown */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Manager</label>
            <select
              {...register("managerId", { required: "Manager selection required" })}
              className={`w-full p-3 border ${errors.managerId ? "border-red-400" : "border-gray-200 focus:border-yellow-400"} rounded-lg bg-gray-50 outline-none duration-200`}
            >
              <option value="">Select Manager</option>
              {managers.map((mng) => (
                <option key={mng._id} value={mng._id}>{mng.name}</option>
              ))}
            </select>
            {errors.managerId && (<p className="text-red-500 text-xs mt-1">{errors.managerId.message}</p>)}
          </div>
          {/* Password with eye toggle - optional, no validation */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Password</label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password (leave blank to keep unchanged)"
                    className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 pr-10 outline-none duration-200"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEditAgent;
