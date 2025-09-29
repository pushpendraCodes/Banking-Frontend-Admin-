import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CreditCard, Calendar, User, CheckCircle, Clock, XCircle, ChevronLeft, ChevronRight, Download, Filter, Search } from "lucide-react";

function PaymentDetails() {
  const navigate = useNavigate();
  const { customerId, schemeType } = useParams();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // fixed page size, can make dropdown
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}transactionSchemes/transactions`,
          {
            params: { customerId, schemeType, page, limit },

            headers: { Authorization: `Bearer ${token}` },

          }
        );

        setTransactions(res.data.transactions || []);
        setTotal(res.data.total || 0); // backend should return total count
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (customerId && schemeType) {
      fetchTransaction();
    }
  }, [customerId, schemeType, page, limit]);

  const totalPages = Math.ceil(total / limit);

  const getStatusConfig = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          bg: "bg-green-50",
          text: "text-green-700",
          border: "border-green-200",
          icon: <CheckCircle className="w-4 h-4" />
        };
      case "pending":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          border: "border-yellow-200",
          icon: <Clock className="w-4 h-4" />
        };
      case "rejected":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: <XCircle className="w-4 h-4" />
        };
      default:
        return {
          bg: "bg-gray-50",
          text: "text-gray-700",
          border: "border-gray-200",
          icon: <Clock className="w-4 h-4" />
        };
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.history.back()}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Payment Details</h2>
                    <p className="text-blue-100 text-sm">View all transaction history</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Action Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-3 flex-wrap">
                  {/* <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button> */}
                  {/* <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md">
                    <Download className="w-4 h-4" />
                    Export
                  </button> */}
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Table Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 text-lg font-medium">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <CreditCard className="w-20 h-20 text-gray-300 mb-4" />
                  <p className="text-gray-600 text-lg font-semibold mb-2">No transactions found</p>
                  <p className="text-gray-500 text-sm">Transactions will appear here once they are created</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block text-xs overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Transaction ID
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Account
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Mode
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Installment
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Agent
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {transactions.map((txn, index) => {
                          const statusConfig = getStatusConfig(txn.status);
                          return (
                            <tr key={txn._id} className="hover:bg-indigo-50/50 transition-colors group">
                              <td className="px-6 py-4">
                                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                                  {txn.transactionId}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-xs text-gray-700 font-medium">
                                {txn.accountNumber}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`text-xs font-medium px-3 py-1 rounded-lg ${txn.transactionType === "Deposit"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-orange-50 text-orange-700"
                                  }`}>
                                  {txn.transactionType}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm font-bold text-gray-800">
                                  ₹{txn.amount.toLocaleString()}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                                  {txn.mode}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-xs text-gray-700 font-medium text-center">
                                {txn.installmentNo || "-"}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                  {statusConfig.icon}
                                  {txn.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">
                                    {txn.agentId?.name?.charAt(0) || "?"}
                                  </div>
                                  <span className="text-xs text-gray-700">{txn.agentId?.name || "-"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(txn.date).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden space-y-4 p-4">
                    {transactions.map((txn) => {
                      const statusConfig = getStatusConfig(txn.status);
                      return (
                        <div key={txn._id} className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                              {txn.transactionId}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                              {statusConfig.icon}
                              {txn.status}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Amount</span>
                              <span className="text-xl font-bold text-gray-800">₹{txn.amount.toLocaleString()}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Account</span>
                              <span className="text-sm font-medium text-gray-700">{txn.accountNumber}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Type</span>
                              <span className={`text-sm font-medium px-3 py-1 rounded-lg ${txn.transactionType === "Deposit"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-orange-50 text-orange-700"
                                }`}>
                                {txn.transactionType}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Mode</span>
                              <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">{txn.mode}</span>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{txn.agentId?.name || "-"}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                {new Date(txn.date).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-t-2 border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Showing <span className="font-semibold text-gray-800">{(page - 1) * limit + 1}</span> to{" "}
                        <span className="font-semibold text-gray-800">{Math.min(page * limit, total)}</span> of{" "}
                        <span className="font-semibold text-gray-800">{total}</span> results
                      </div>

                      <div className="flex gap-2">
                        <button
                          disabled={page === 1}
                          onClick={() => setPage((p) => p - 1)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${page === 1
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-md hover:shadow-lg"
                            }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Previous
                        </button>

                        <div className="flex items-center px-4 py-2 bg-white rounded-xl shadow-md">
                          <span className="text-sm font-semibold text-gray-700">
                            Page {page} of {totalPages || 1}
                          </span>
                        </div>

                        <button
                          disabled={page === totalPages}
                          onClick={() => setPage((p) => p + 1)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${page === totalPages
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-md hover:shadow-lg"
                            }`}
                        >
                          Next
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      

    </>
  );
}

export default PaymentDetails;
