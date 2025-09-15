import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiCustomerUrl, apiManagerUrl, apiAgentUrl } from "../../api/apiRoutes";
import ShortPopup from "../../component/ShortPopup";
import DeletePopup from "../../component/DeletePopup";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & search
  const [search, setSearch] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 0,
  });

  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);

  // 🔹 Fetch Managers
  const fetchManagers = async () => {
    try {
      const res = await axios.get(apiManagerUrl);
      setManagers(res.data.data);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  // 🔹 Fetch Agents
  const fetchAgents = async () => {
    try {
      const res = await axios.get(apiAgentUrl);
      setAgents(res.data.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  // 🔹 Fetch Customers with filters & pagination
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      let url = `${apiCustomerUrl}?page=${page}&limit=${limit}`;
      const params = [];

      if (search.trim())
        params.push(`search=${encodeURIComponent(search.trim())}`);
      if (selectedManager) params.push(`managerId=${selectedManager}`);
      if (selectedAgent) params.push(`agentId=${selectedAgent}`);
      if (startDate) params.push(`fromDate=${startDate}`);
      if (endDate) params.push(`toDate=${endDate}`);

      if (params.length > 0) url += `&${params.join("&")}`;

      const res = await axios.get(url);
      setCustomers(res.data?.data || []);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchManagers();
    fetchAgents();
    fetchCustomers();
  }, []);

  // Re-fetch on filter/search/page/limit change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCustomers();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search, selectedManager, selectedAgent, startDate, endDate, page, limit]);

  // 🔹 Delete Confirm
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiCustomerUrl}/${deleteId}`);
      setCustomers((prev) => prev.filter((cust) => cust._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      alert("Failed to delete customer ❌");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading customers...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold">Customer Management</h2>
        <Link
          to="/coustomers/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm whitespace-nowrap"
        >
          Add Customer
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or contact"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset to first page
          }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64"
        />

        {/* Manager Dropdown */}
        <select
          value={selectedManager}
          onChange={(e) => {
            setSelectedManager(e.target.value);
            setPage(1);
          }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64"
        >
          <option value="">All Managers</option>
          {managers.map((m, i) => (
            <option key={i} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Agent Dropdown */}
        <select
          value={selectedAgent}
          onChange={(e) => {
            setSelectedAgent(e.target.value);
            setPage(1);
          }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64"
        >
          <option value="">All Agents</option>
          {agents.map((a, i) => (
            <option key={i} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <button
          onClick={() => setShowSortModal(true)}
          className="sm:ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100 whitespace-nowrap"
        >
          Sort By
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Serial No.</th>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Email Address</th>
              <th className="px-4 py-2 border">Contact No.</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((cust, idx) => (
                <tr key={cust._id} className="odd:bg-white even:bg-yellow-50">
                  <td className="px-4 py-2 border">
                    {String((page - 1) * limit + idx + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2 border">{cust.name}</td>
                  <td className="px-4 py-2 border">
                    <a
                      href={`mailto:${cust.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {cust.email}
                    </a>
                  </td>
                  <td className="px-4 py-2 border">
                    <a
                      href={`tel:${cust.contact?.replace(/\s/g, "")}`}
                      className="text-blue-600 hover:underline"
                    >
                      {cust.contact}
                    </a>
                  </td>
                  <td className="px-4 py-2 border">{cust.address}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/coustomers/viewdetails/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                        title="View"
                      >
                        <FaEye size={14} />
                      </Link>
                      <Link
                        to={`/coustomers/View-Edit/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                        title="Edit"
                      >
                        <FaPen size={14} />
                      </Link>
                      <button
                        onClick={() => confirmDelete(cust._id)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {pagination.page} of {pagination.pages}
        </span>

        <button
          disabled={page === pagination.pages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Page Size Dropdown */}
      <div className="mt-3">
        <label className="mr-2">Rows per page:</label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Delete Modal */}
      <DeletePopup
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />

      {/* Sort Modal */}
      <ShortPopup
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        show={showSortModal}
        onClose={() => setShowSortModal(false)}
      />
    </div>
  );
}
