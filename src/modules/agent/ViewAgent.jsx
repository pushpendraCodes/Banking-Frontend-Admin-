import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTie, FaCalendarAlt, FaToggleOn, FaUsers, FaHeart, FaBirthdayCake, FaPiggyBank, FaChartLine, FaIdCard, FaCreditCard, FaPen, FaCheck, FaVenus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import { apiAgentUrl } from "../../api/apiRoutes";

function ViewAgent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await api.get(`${apiAgentUrl}/${id}`);
        setAgent(res.data.data || res.data); // ✅ backend ke response ke hisaab se
      } catch (error) {
        console.error("Error fetching agent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading agent details...</p>;
  }

  if (!customer) {
    return <p className="text-center text-red-500">Agent not found ❌</p>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        {/* Header */}
        <div className="bg-white shadow-md px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-orange-600 p-2 hover:bg-orange-100 rounded-full transition-colors"
          >
            <FaArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Agent Details</h1>
        </div>


        <div className="max-w-6xl mx-auto p-6">
          {/* Customer Info Card */}
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Customer Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <FaUser className="text-orange-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Agent Information</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Personal Details */}
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaUser className="text-orange-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Name</span>
                      <p className="text-gray-800 font-semibold">{customer?.name || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaEnvelope className="text-orange-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Email Address</span>
                      <p className="text-gray-800 font-semibold">{customer?.email || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaPhone className="text-orange-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Contact Number</span>
                      <p className="text-gray-800 font-semibold">{customer?.contact || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-orange-500 mr-3 mt-1" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Address</span>
                      <p className="text-gray-800 font-semibold">{customer?.address || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaVenus className="text-orange-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Gender</span>
                      <p className="text-gray-800 font-semibold capitalize">{customer?.gender || "N/A"}</p>
                    </div>
                  </div>

                 <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                   <FaUserTie className="text-orange-500 mr-3" />
                                   <div className="flex-1">
                                     <span className="text-sm font-medium text-gray-600">Manager</span>
                                     <p className="text-gray-800 font-semibold">{customer?.managerId?.name || "Not Assigned"}</p>
                                   </div>
                                 </div>
                                 <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                   <FaUserTie className="text-orange-500 mr-3" />
                                   <div className="flex-1">
                                     <span className="text-sm font-medium text-gray-600">Area Manager</span>
                                     <p className="text-gray-800 font-semibold">{customer?.areaManagerId?.name || "Not Assigned"}</p>
                                   </div>
                                 </div>
                </div>
              </div>

              {/* Account & Document Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaIdCard className="text-blue-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Account & Document Details</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaPiggyBank className="text-blue-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Saving Account Number</span>
                      <p className="text-gray-800 font-semibold">{customer?.savingAccountNumber || "Not Assigned"}</p>
                    </div>
                  </div> */}

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaIdCard className="text-blue-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Aadhar Number</span>
                      <p className="text-gray-800 font-semibold">
                        {customer?.AadharNo || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaCreditCard className="text-blue-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">PAN Card</span>
                      <p className="text-gray-800 font-semibold">
                        {customer?.panCard || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaPen className="text-blue-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Signature</span>
                      <div className="mt-2">
                        {customer?.signature ? (
                          <div className="flex items-center space-x-2">
                            <FaCheck className="text-green-500" />
                            <span className="text-green-600 font-medium">Uploaded</span>
                            <a href={customer?.signature} target="blank" className="text-blue-500 hover:text-blue-700 underline text-sm">
                              View
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <FaTimes className="text-red-500" />
                            <span className="text-red-600 font-medium">Not Uploaded</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaCalendarAlt className="text-blue-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Registration Date</span>
                      <p className="text-gray-800 font-semibold">
                        {customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-IN') : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <FaToggleOn className="text-blue-500 mr-3" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-600">Account Status</span>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer?.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                          }`}>
                          {customer?.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nominee Information */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaUsers className="text-green-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Nominee Information</h2>
                </div>

                {customer?.NomineeDetails ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaUser className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Nominee Name</span>
                        <p className="text-gray-800 font-semibold">{customer.NomineeDetails.name || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaHeart className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Relation</span>
                        <p className="text-gray-800 font-semibold capitalize">{customer.NomineeDetails.relation || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaBirthdayCake className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Age</span>
                        <p className="text-gray-800 font-semibold">{customer.NomineeDetails.age || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaCalendarAlt className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Date of Birth</span>
                        <p className="text-gray-800 font-semibold">
                          {customer.NomineeDetails.dob ? new Date(customer.NomineeDetails.dob).toLocaleDateString('en-IN') : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaEnvelope className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Email</span>
                        <p className="text-gray-800 font-semibold">{customer.NomineeDetails.email || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaPhone className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Mobile Number</span>
                        <p className="text-gray-800 font-semibold">{customer.NomineeDetails.mobile || "N/A"}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaIdCard className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Aadhar Number</span>
                        <p className="text-gray-800 font-semibold">
                          {customer.NomineeDetails.AadharNo || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <FaCreditCard className="text-green-500 mr-3" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">PAN Card</span>
                        <p className="text-gray-800 font-semibold">
                          {customer.NomineeDetails.panCard || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start p-4 bg-gray-50 rounded-lg md:col-span-2 lg:col-span-1">
                      <FaMapMarkerAlt className="text-green-500 mr-3 mt-1" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-600">Address</span>
                        <p className="text-gray-800 font-semibold">{customer.NomineeDetails.address || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaExclamationTriangle className="text-yellow-500 text-4xl mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No nominee information available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAgent;
