import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiManagerUrl } from "../../api/apiRoutes";
import DeletePopup from "../../component/DeletePopup";

export default function ManagerList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const [page, setPage] = useState(1); // ✅ current page
  const [limit] = useState(10); // ✅ rows per page

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token")

  // ✅ Fetch managers with search + pagination
  const fetchManagers = async (query = "", pageNum = 1) => {
    try {
      const response = await axios.get(
        `${apiManagerUrl}?search=${query}&page=${pageNum}&limit=${limit}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
}
      );
      setData(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers(search, page);
  }, [page ,search ,limit]); // when page changes, fetch again

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiManagerUrl}/${deleteId}`,{
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
      alert("Manager deleted successfully ✅");
      fetchManagers(search, page);
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete manager ❌");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to page 1 on search
    fetchManagers(search, 1);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading data...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching data: {error.message}
      </p>
    );
  }

  return (
    <div className="p-4">
      <div className="flex p-3 justify-between bg-[#dc5212] items-center mb-4">
        <h2 className="text-xl font-bold">Manager Management</h2>
        <Link
          to="/managers/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Manager
        </Link>
      </div>

      {/* 🔍 Search */}
      <form onSubmit={handleSearch} className="flex items-center mb-4 gap-2">
        <label className="text-sm font-medium">Search:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Manager name"
          className="border border-gray-400 px-3 py-1 rounded w-64"
        />
      </form>

      {/* 📋 Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Sr.</th>
              <th className="px-4 py-2 border">Manager Name</th>
              <th className="px-4 py-2 border">Email Address</th>
              <th className="px-4 py-2 border">Contact No.</th>
              <th className="px-4 py-2 border">Address</th>
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
                    <div className="flex gap-2">
                      <Link
                        to={`/managers/view/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaEye size={14} />
                      </Link>
                      <Link
                        to={`/managers/view-edit/${cust._id}`}
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
                <td colSpan="6" className="text-center text-gray-500 py-4">
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
