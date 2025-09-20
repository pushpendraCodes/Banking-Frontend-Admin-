import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiAgentUrl, apiManagerUrl } from "../../api/apiRoutes";
import { useForm, Controller } from "react-hook-form";

const AddAgent = () => {
  const navigate = useNavigate();
  const [managers, setManagers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm();

  useEffect(() => {
    // Fetch managers
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

  const onSubmit = async (data) => {
    try {
      await axios.post(apiAgentUrl, data);
      alert("Agent added successfully ✅");
      navigate(-1);
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("Failed to add agent ❌");
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
              Add Agent
            </h2>
          </div>
          <button
            type="submit"
            form="addAgentForm"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg shadow-sm active:scale-95 transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>

        <form
          id="addAgentForm"
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 flex flex-col gap-6"
        >
          {/* Name */}
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
          {/* Password with toggle */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">Password</label>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be ≥6 chars"
                  }
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className={`w-full p-3 border ${errors.password ? "border-red-400" : "border-gray-200 focus:border-yellow-400"} rounded-lg bg-gray-50 pr-10 outline-none duration-200`}
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
            {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>)}
          </div>
          {/* Gender */}
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
          {/* Manager */}
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
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
