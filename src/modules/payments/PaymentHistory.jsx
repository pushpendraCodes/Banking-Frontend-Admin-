import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaArrowLeft, FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PaymentHistory() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // "today" | "yesterday" | ""

  const manager = JSON.parse(localStorage.getItem("user"));
  const [agents, setAgents] = useState([]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch transactions with filters
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search: debouncedSearch,
        page,
        limit,
       
      };
      if (selectedAgent) params.agentId = selectedAgent;
      if (dateFilter) params.filter = dateFilter; // pass today/yesterday filter

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}transactionSchemes/transactions`,
        { params }
      );

      if (response.data) {
        setData(response.data.transactions || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalItems(response.data.total || 0);
      } else {
        setData([]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page, limit, selectedAgent, dateFilter, manager._id]);

  // Fetch agent list
  const fetchAgents = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}agent`,
        { params: { all: true } }
      );
      setAgents(response.data?.data || []);
    } catch {
      setAgents([]);
    }
  }, [manager._id]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Accept transaction API call and optimistic update
 const handleAccept = async (id, status) => {
  try {
    const confirm = window.confirm(`Are you sure you want to ${status} this transaction?`);
    if (!confirm) return; // ❌ stop if user cancels

    const body = { status, managerId: manager._id };
    await axios.post(
      `${import.meta.env.VITE_API_URL}transactionSchemes/transaction/approvedReject/${id}`,
      body
    );

    setData((prev) =>
      prev.map((trx) =>
        trx._id === id ? { ...trx, status } : trx
      )
    );
  } catch (err) {
    alert("Failed to accept transaction");
  }
};



  // Status color helper
  const statusColorClass = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-green-600 font-semibold";
      case "rejected":
        return "text-red-600 font-semibold";
      case "pending":
        return "text-yellow-600 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className=" mx-auto p-4">
      {/* Header */}
      <div className="flex gap-2 items-center mb-6">
       
        <h2 className="text-2xl font-bold">Payments</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap sm:flex-nowrap sm:items-center justify-between gap-4 mb-4">
        {/* Agent Filter */}
        <select
          className="border border-gray-400 rounded px-3 py-2 w-full sm:w-64"
          value={selectedAgent}
          onChange={(e) => {
            setSelectedAgent(e.target.value);
            setPage(1);
          }}
          aria-label="Filter by agent"
        >
          <option value="">All Agents</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>

        {/* Search */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Ledger Number"
          className="border border-gray-400 rounded px-3 py-2 w-full sm:w-64"
          aria-label="Search payments by ledger number"
        />

        {/* Date Filter Buttons */}
        <div className="flex gap-2 whitespace-nowrap">
          <button
            onClick={() => setDateFilter("today")}
            className={`px-4 py-2 rounded font-semibold border ${dateFilter === "today"
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
              }`}
          >
            Today
          </button>
          <button
            onClick={() => setDateFilter("yesterday")}
            className={`px-4 py-2 rounded font-semibold border ${dateFilter === "yesterday"
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
              }`}
          >
            Yesterday
          </button>
          <button
            onClick={() => setDateFilter("")}
            className={`px-4 py-2 rounded font-semibold border ${dateFilter === ""
                ? "bg-yellow-400 text-white border-yellow-400"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
              }`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Sr.</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Ledger No</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Action</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  Loading data...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-red-500">
                  Error: {error.message}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              data.map((trx, idx) => (
                <tr
                  key={trx._id}
                  className="odd:bg-white even:bg-yellow-50 hover:bg-yellow-100 transition"
                >
                  <td className="px-4 py-2 border">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(trx.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{trx.accountNumber}</td>
                  <td className="px-4 py-2 border">
                    {trx.customerId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">{trx.amount.toFixed(2)}</td>
                  <td className="px-4 py-2 border">
                    {trx.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                          onClick={() => handleAccept(trx._id, "approved")}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                          onClick={() => handleAccept(trx._id, "rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className={statusColorClass(trx.status)}>
                        {trx.status}
                      </span>
                    )}
                  </td>
                  <td className={`px-4 py-2 border flex gap-3 items-center capitalize ${statusColorClass(trx.status)}`}>
                    {trx.status}
                    <button onClick={() => navigate(`/payments/view/${trx._id}`)}>
                      <FaEye size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage((p) => p - 1)}
          className={`px-4 py-1 border rounded ${page === 1 || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
            }`}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages} ({totalItems} Payments)
        </span>
        <button
          disabled={page === totalPages || loading}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-1 border rounded ${page === totalPages || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
