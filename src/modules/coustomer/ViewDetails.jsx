import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserTie, FaPiggyBank, FaChartLine } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiCustomerUrl } from "../../api/apiRoutes";

function ViewDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch customer details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${apiCustomerUrl}/${id}`);
        if (res.data.success) {
          setCustomer(res.data.data); // customer info
          setAccounts(res.data.data.accounts || []); // accounts list
        } else {
          setError("Customer not found");
        }
      } catch (err) {
        setError("Failed to fetch customer details");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading customer details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-md px-6 py-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-orange-600 p-2 hover:bg-orange-100 rounded-full transition-colors"
        >
          <FaArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Customer Details</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Customer Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-3 rounded-full mr-4">
              <FaUser className="text-orange-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Customer Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
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
            </div>

            <div className="space-y-4">
              <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-orange-500 mr-3 mt-1" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-600">Address</span>
                  <p className="text-gray-800 font-semibold">{customer?.address || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FaUserTie className="text-orange-500 mr-3" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-600">Agent</span>
                  <p className="text-gray-800 font-semibold">{customer?.agentId?.name || "Not Assigned"}</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <FaUserTie className="text-orange-500 mr-3" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-600">Saving Account Number</span>
                  <p className="text-gray-800 font-semibold">{customer?.savingAccountNumber|| "Not Assigned"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FD Schemes Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-green-100 p-3 flex items-center gap-2 rounded-full mr-4">
              <FaPiggyBank className="text-green-600 text-2xl" />
              <h3 className="text-2xl font-bold text-gray-800">Fixed Deposit Schemes</h3>
            </div>



          {customer?.fdSchemes?.length > 0 &&
              <div>
              <Link
                to={`/coustomers/paymentdetails/${id}/FD`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
              >
                Payment Details
              </Link>

            </div>
          }
          </div>

          {customer?.fdSchemes?.length > 0 ? (
            <div className="grid gap-6">
              {customer.fdSchemes.map((fd, i) => (
                <div key={i} className="border-2 border-green-200 rounded-xl p-6 bg-green-50 hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">FD Account No</span>
                        <p className="text-lg font-bold text-gray-800">{fd.fdAccountNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Principal Amount</span>
                        <p className="text-xl font-bold text-green-600">₹{fd.fdPrincipalAmount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Deposit Amount</span>
                        <p className="text-lg font-semibold text-gray-800">₹{fd.fdDepositAmount?.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Interest Rate</span>
                        <p className="text-lg font-bold text-blue-600">{fd.fdInterestRate}% p.a.</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Tenure</span>
                        <p className="text-lg font-semibold text-gray-800">{fd.fdTenure} {fd.fdTenureType}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Opening Date</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {fd.fdOpeningDate ? new Date(fd.fdOpeningDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Maturity Date</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {fd.fdMaturityDate ? new Date(fd.fdMaturityDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Maturity Amount</span>
                        <p className="text-xl font-bold text-green-600">₹{fd.fdMaturityAmount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Status</span>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${fd.fdAccountStatus === 'Active'
                            ? 'bg-green-200 text-green-800'
                            : fd.fdAccountStatus === 'Matured'
                              ? 'bg-blue-200 text-blue-800'
                              : 'bg-red-200 text-red-800'
                          }`}>
                          {fd.fdAccountStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">💰</div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No Fixed Deposit Schemes Found</h4>
              <p className="text-gray-500">This customer doesn't have any FD schemes yet.</p>
            </div>
          )}
        </div>

        {/* RD Schemes Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-100 p-3 flex gap-3 items-center rounded-full mr-4">
              <FaChartLine className="text-purple-600 text-2xl" />
              <h3 className="text-2xl font-bold text-gray-800">Recurring Deposit Schemes</h3>
            </div>

            {customer?.rdSchemes?.length > 0 &&
              <div>
              <Link
                to={`/coustomers/paymentdetails/${id}/RD`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
              >
                Payment Details
              </Link>

            </div>
            }
          </div>

          {customer?.rdSchemes?.length > 0 ? (
            <div className="grid gap-6">
              {customer.rdSchemes.map((rd, i) => (
                <div key={i} className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50 hover:shadow-lg transition-shadow">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">RD Account No</span>
                        <p className="text-lg font-bold text-gray-800">{rd.rdAccountNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Installment Amount</span>
                        <p className="text-xl font-bold text-purple-600">₹{rd.rdInstallAmount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Total Installments</span>
                        <p className="text-lg font-semibold text-gray-800">{rd.rdTotalInstallments}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Interest Rate</span>
                        <p className="text-lg font-bold text-blue-600">{rd.rdInterestRate}% p.a.</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Opening Date</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {rd.rdOpeningDate ? new Date(rd.rdOpeningDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Maturity Date</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {rd.rdMaturityDate ? new Date(rd.rdMaturityDate).toLocaleDateString() : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">RD Total DepositedtAmount</span>
                        <p className="text-lg font-bold text-blue-600">{rd.rdTotalDepositedtAmount}% p.a.</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">RD Total DepositedInstallment</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {rd.rdTotalDepositedInstallment || "N/A"}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">RD Tenure Type</span>
                        <p className="text-lg font-semibold text-gray-800">
                          {rd.rdTenureType || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Maturity Amount</span>
                        <p className="text-xl font-bold text-purple-600">₹{rd.rdMaturityAmount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Status</span>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${rd.rdAccountStatus === 'Active'
                            ? 'bg-green-200 text-green-800'
                            : rd.rdAccountStatus === 'Matured'
                              ? 'bg-blue-200 text-blue-800'
                              : 'bg-red-200 text-red-800'
                          }`}>
                          {rd.rdAccountStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📈</div>
              <h4 className="text-xl font-semibold text-gray-600 mb-2">No Recurring Deposit Schemes Found</h4>
              <p className="text-gray-500">This customer doesn't have any RD schemes yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;