import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiManagerUrl } from "../../api/apiRoutes";
import { useForm } from "react-hook-form";

const ViewEditManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      address: "",
      education: "",
      alternateNumber: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axios
      .get(`${apiManagerUrl}/${id}`)
      .then((res) => {
        const data = res.data?.data || res.data;
        reset({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          address: data.address || "",
          education: data.education || "",
          alternateNumber: data.alternateNumber || "",
          password: "", // keep password blank on edit
        });
      })
      .catch((err) => {
        console.error("Error fetching manager:", err);
        alert("Failed to fetch manager data.");
      })
      .finally(() => setLoading(false));
  }, [id, reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await axios.put(`${apiManagerUrl}/${id}`, data);
      alert("Manager updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error updating manager:", err);
      alert("Failed to update manager.");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600">Loading manager data...</p>
      </div>
    );

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
              View/Edit Manager
            </h2>
          </div>
          <button
            type="submit"
            form="editManagerForm"
            disabled={isSubmitting || saving}
            className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg shadow-sm active:scale-95 transition-all"
          >
            {saving ? "Updating..." : "Update"}
          </button>
        </div>

        <form
          id="editManagerForm"
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 flex flex-col gap-6"
        >
          {/* Manager Name */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Manager Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Manager name is required",
                minLength: { value: 2, message: "At least 2 chars" },
              })}
              className={`flex-1 border px-3 py-2 rounded bg-gray-50 border-gray-200 focus:border-yellow-400 outline-none ${
                errors.name ? "border-red-400" : ""
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1 ml-40">{errors.name.message}</p>
          )}

          {/* Email Address */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Email Address</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email format",
                },
              })}
              className={`flex-1 border px-3 py-2 rounded bg-gray-50 border-gray-200 focus:border-yellow-400 outline-none ${
                errors.email ? "border-red-400" : ""
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 ml-40">{errors.email.message}</p>
          )}

          {/* Contact No. */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Contact No.</label>
            <input
              type="text"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact must be 10 digits",
                },
              })}
              className={`flex-1 border px-3 py-2 rounded bg-gray-50 border-gray-200 focus:border-yellow-400 outline-none ${
                errors.contact ? "border-red-400" : ""
              }`}
            />
          </div>
          {errors.contact && (
            <p className="text-red-500 text-xs mt-1 ml-40">{errors.contact.message}</p>
          )}

          {/* Address */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className={`flex-1 border px-3 py-2 rounded bg-gray-50 border-gray-200 focus:border-yellow-400 outline-none ${
                errors.address ? "border-red-400" : ""
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-xs mt-1 ml-40">{errors.address.message}</p>
          )}

          {/* Education */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Education</label>
            <input
              type="text"
              {...register("education", { required: "Education is required" })}
              className={`flex-1 border px-3 py-2 rounded bg-gray-50 border-gray-200 focus:border-yellow-400 outline-none ${
                errors.education ? "border-red-400" : ""
              }`}
            />
          </div>
          {errors.education && (
            <p className="text-red-500 text-xs mt-1 ml-40">{errors.education.message}</p>
          )}

          {/* Alternate Number */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Alternate No.</label>
            <input
              type="text"
              {...register("alternateNumber")}
              className="flex-1 border border-gray-200 px-3 py-2 rounded bg-gray-50 outline-none"
            />
          </div>

          {/* Password (optional, no validation) */}
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Password</label>
            <input
              type="text"
              {...register("password")}
              placeholder="Leave blank to keep unchanged"
              className="flex-1 border border-gray-200 px-3 py-2 rounded bg-gray-50 outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEditManager;
