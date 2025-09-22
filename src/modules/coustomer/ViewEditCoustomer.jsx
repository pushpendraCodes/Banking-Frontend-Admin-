import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [existingSignature, setExistingSignature] = useState(null);

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
      AadharNo: "",
      panCard: "",
      signature: null,
      NomineeDetails: {
        name: "",
        relation: "",
        age: "",
        dob: "",
        email: "",
        mobile: "",
        AadharNo: "",
        panCard: "",
        address: ""
      }
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  // add this state at top inside your component
  const [previewSignature, setPreviewSignature] = useState(null);
  const [newSignatureFile, setNewSignatureFile] = useState(null);
  const token = localStorage.getItem("token");
  const [customer, setCustomer] = useState({})
  useEffect(() => {
    // Fetch customer details
    const fetchCustomer = async () => {
      try {
        const res = await axios.get(`${apiCustomerUrl}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const customer = res.data?.data || res.data;
        setCustomer(customer)
        reset({
          name: customer.name || "",
          email: customer.email || "",
          contact: customer.contact || "",
          address: customer.address || "",
          agentId: customer.agentId?._id || "",
          gender: customer.gender || "",
          AadharNo: customer.AadharNo || "",
          panCard: customer.panCard || "",
          signature: customer.signature,
          NomineeDetails: {
            name: customer.NomineeDetails?.name || "",
            relation: customer.NomineeDetails?.relation || "",
            age: customer.NomineeDetails?.age || "",
            dob: customer.NomineeDetails?.dob
              ? customer.NomineeDetails.dob.slice(0, 10)
              : "",
            email: customer.NomineeDetails?.email || "",
            mobile: customer.NomineeDetails?.mobile || "",
            AadharNo: customer.NomineeDetails?.AadharNo || "",
            panCard: customer.NomineeDetails?.panCard || "",
            address: customer.NomineeDetails?.address || ""
          }
        });
        setExistingSignature(customer.signature || null);
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCustomer();
  }, [id, reset, token]);

  useEffect(() => {
    // Fetch agents
    const fetchAgents = async () => {
      try {
        const res = await axios.get(apiAgentUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAgents(res.data?.data || res.data);
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };
    fetchAgents();
  }, [token]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === "NomineeDetails") {
          Object.entries(value).forEach(([nkey, nvalue]) => {
            formData.append(`NomineeDetails[${nkey}]`, nvalue);
          });
        } else {
          formData.append(key, value);
        }
      });

      if (newSignatureFile) {
        formData.append("signature", newSignatureFile);
      }
      await axios.put(`${apiCustomerUrl}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-white py-10 px-4">
      <div className="w-full mx-auto shadow-lg rounded-xl bg-white">
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
            className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg shadow-sm active:scale-95 transition-all"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
        <form
          id="editForm"
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          encType="multipart/form-data"
        >
          {/* Customer Fields */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be 2+ chars" }
              })}
              className={`w-full p-3 border ${errors.name ? "border-red-400" : "border-gray-200"
                } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

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
              className={`w-full p-3 border ${errors.email ? "border-red-400" : "border-gray-200"
                } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Contact
            </label>
            <input
              type="text"
              maxLength={10}
              {...register("contact", {
                required: "Contact is required",
                pattern: { value: /^[0-9]{10}$/, message: "Contact must be 10 digits" }
              })}
              className={`w-full p-3 border ${errors.contact ? "border-red-400" : "border-gray-200"
                } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Contact"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className={`w-full p-3 border ${errors.address ? "border-red-400" : "border-gray-200"
                } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Address"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`w-full p-3 border ${errors.gender ? "border-red-400" : "border-gray-200"
                } rounded-lg bg-gray-50 outline-none duration-200`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Agent
            </label>
            <select
              {...register("agentId", { required: "Agent selection required" })}
              className={`w-full p-3 border ${errors.agentId ? "border-red-400" : "border-gray-200"
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

          {/* Aadhaar */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Aadhar Number
            </label>
            <input
              type="text"
              maxLength={12}
              {...register("AadharNo", {
                required: "AadharNo is required",
                minLength: { value: 12, message: "Aadhar number must be 12 digits" },
                maxLength: { value: 12, message: "Aadhar number must be 12 digits" },
                pattern: { value: /^\d{12}$/, message: "Aadhar number must be 12 digits" }
              })}
              className={`w-full p-3 border ${errors.AadharNo ? "border-red-400" : "border-gray-200"
                } rounded-lg bg-gray-50 outline-none duration-200`}
              placeholder="Enter Aadhar No."
            />
            {errors.AadharNo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.AadharNo.message}
              </p>
            )}
          </div>

          {/* PAN */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              PAN Card
            </label>
            <input
              type="text"
              maxLength={10}
              {...register("panCard", {
                required: "PAN card is required",
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: "Invalid PAN format"
                }
              })}
              className={`w-full p-3 border ${errors.panCard ? "border-red-400" : "border-gray-200"
                } rounded-lg bg-gray-50 outline-none duration-200 uppercase`}
              placeholder="Enter PAN Card Number"
            />
            {errors.panCard && (
              <p className="text-red-500 text-xs mt-1">
                {errors.panCard.message}
              </p>
            )}
          </div>
<div>
  <label className="block font-semibold text-sm mb-1 text-gray-700">
    New Password
  </label>
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      {...register("password", {
        minLength: { value: 6, message: "Password must be at least 6 characters" }
      })}
      placeholder="Enter new password"
      className={`w-full p-3 border ${errors.password ? "border-red-400" : "border-gray-200"} rounded-lg bg-gray-50 outline-none pr-10`}
    />
    <button
      type="button"
      onClick={() => setShowPassword(prev => !prev)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
  {errors.password && (
    <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
  )}
</div>
          {/* Signature */}
          <div>
            <label className="block font-semibold text-sm mb-1 text-gray-700">
              Signature
            </label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setNewSignatureFile(file);
                  setPreviewSignature(URL.createObjectURL(file)); // local preview
                }
              }}
              className="w-full"
            />

            {/* Show preview */}
            <div className="mt-2">
              {previewSignature ? (
                previewSignature.endsWith(".pdf") ? (
                  <embed
                    src={previewSignature}
                    type="application/pdf"
                    className="h-32 border rounded"
                  />
                ) : (
                  <img
                    src={previewSignature}
                    alt="Signature Preview"
                    className="h-24 border rounded"
                  />
                )
              ) : (
                // show existing signature from DB if no new file selected
                customer?.signature && (
                  customer.signature.endsWith(".pdf") ? (
                    <embed
                      src={customer.signature}
                      type="application/pdf"
                      className="h-32 border rounded"
                    />
                  ) : (
                    <img
                      src={customer.signature}
                      alt="Signature"
                      className="h-24 border rounded"
                    />
                  )
                )
              )}
            </div>
          </div>


          {/* Nominee Details */}
          <div className="md:col-span-2 border-t border-gray-200 mt-6 pt-4">
            <h3 className="font-semibold mb-4 text-gray-700">Nominee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Nominee Name
                </label>
                <input
                  type="text"
                  {...register("NomineeDetails.name", {
                    required: "Nominee name required"
                  })}
                  placeholder="Nominee Name"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.name
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Relation
                </label>
                <input
                  type="text"
                  {...register("NomineeDetails.relation", {
                    required: "Relation required"
                  })}
                  placeholder="Relation"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.relation
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.relation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.relation.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  {...register("NomineeDetails.age", {
                    required: "Age required"
                  })}
                  placeholder="Age"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.age
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.age && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.age.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  {...register("NomineeDetails.dob", {
                    required: "DOB required"
                  })}
                  className={`w-full p-3 border ${errors?.NomineeDetails?.dob
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.dob && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.dob.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Nominee Email
                </label>
                <input
                  type="email"
                  {...register("NomineeDetails.email", {
                    required: "Email required"
                  })}
                  placeholder="Nominee Email"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.email
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  {...register("NomineeDetails.mobile", {
                    required: "Mobile number required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "10-digit mobile required"
                    }
                  })}
                  placeholder="Mobile"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.mobile
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.mobile && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.mobile.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  maxLength={12}
                  {...register("NomineeDetails.AadharNo", {
                    required: "Aadhaar required",
                    pattern: {
                      value: /^\d{12}$/,
                      message: "Must be 12 digits"
                    }
                  })}
                  placeholder="Nominee Aadhaar"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.AadharNo
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.AadharNo && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.AadharNo.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  PAN Card
                </label>
                <input
                  type="text"
                  maxLength={10}
                  {...register("NomineeDetails.panCard", {
                    required: "PAN required",
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Invalid PAN format"
                    }
                  })}
                  placeholder="Nominee PAN"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.panCard
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none uppercase`}
                />
                {errors?.NomineeDetails?.panCard && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.panCard.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block font-semibold text-sm mb-1 text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  {...register("NomineeDetails.address", {
                    required: "Address required"
                  })}
                  placeholder="Nominee Address"
                  className={`w-full p-3 border ${errors?.NomineeDetails?.address
                    ? "border-red-400"
                    : "border-gray-200"
                    } rounded-lg bg-gray-50 outline-none`}
                />
                {errors?.NomineeDetails?.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.NomineeDetails.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewEditCustomer;
