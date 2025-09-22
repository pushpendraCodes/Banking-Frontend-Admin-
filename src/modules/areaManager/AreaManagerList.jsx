import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import DeletePopup from "../../component/DeletePopup";

export default function AreaManagerList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [managers, setManagers] = useState([]); // ✅ list of managers for dropdown
  const [selectedManager, setSelectedManager] = useState(""); // ✅ selected managerId

  const token = localStorage.getItem("token");

  // 🔽 Fetch Managers for dropdown
  const fetchManagersList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}manager?all=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  // ✅ Fetch Area Managers with filters
  const fetchAreaManagers = async (query = "", pageNum = 1, managerId = "") => {
    try {
      let url = `${import.meta.env.VITE_API_URL}areaManager?search=${query}&page=${pageNum}&limit=${limit}`;
      if (managerId) url += `&managerId=${managerId}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagersList(); // fetch dropdown list once
  }, []);

  useEffect(() => {
    fetchAreaManagers(search, page, selectedManager);
  }, [page, search, limit, selectedManager]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}areaManager/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Area Manager deleted successfully ✅");
      fetchAreaManagers(search, page, selectedManager);
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete Area Manager ❌");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchAreaManagers(search, 1, selectedManager);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Area Manager Management</h2>
        <Link
          to="/area-manager/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Area Manager
        </Link>
      </div>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Search Box */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <label className="text-sm font-medium">Search:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Area Manager"
            className="border border-gray-400 px-3 py-1 rounded w-64"
          />
        </form>

        {/* Manager Dropdown */}
        <div>
          <label className="text-sm font-medium mr-2">Filter by Manager:</label>
          <select
            value={selectedManager}
            onChange={(e) => {
              setSelectedManager(e.target.value);
              setPage(1); // reset page when filter changes
            }}
            className="border border-gray-400 px-3 py-1 rounded"
          >
            <option value="">All Managers</option>
            {managers.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name} ({m.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 📋 Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Sr.</th>
              <th className="px-4 py-2 border">Area Manager Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Manager</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.length > 0 ? (
              data.data.map((cust, idx) => (
                <tr key={cust._id} className="odd:bg-white even:bg-yellow-50">
                  <td className="px-4 py-2 border">
                    {(page - 1) * limit + idx + 1}
                  </td>
                  <td className="px-4 py-2 border">{cust.name}</td>
                  <td className="px-4 py-2 border">{cust.email}</td>
                  <td className="px-4 py-2 border">{cust.contact}</td>
                  <td className="px-4 py-2 border">{cust.address}</td>
                  <td className="px-4 py-2 border">
                    {cust.managerId?.name || "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/area-manager/view/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaEye size={14} />
                      </Link>
                      <Link
                        to={`/area-manager/edit/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaPen size={14} />
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(cust._id);
                          setShowDeleteModal(true);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {data?.pagination?.totalPages || 1}
        </span>
        <button
          disabled={page >= (data?.pagination?.totalPages || 1)}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* ✅ Delete Popup */}
      <DeletePopup
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}
