import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiManagerUrl } from "../../api/apiRoutes";

export default function ManagerList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // ✅ search state

  // ✅ Fetch managers
  const fetchManagers = async (query = "") => {
    try {
      const response = await axios.get(
        `${apiManagerUrl}${query ? `?search=${query}` : ""}`
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
    fetchManagers();
  }, []);

  // ✅ Delete manager by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this manager?")) return;

    try {
      await axios.delete(
        `${apiManagerUrl}/${id}`
      );
      alert("Manager deleted successfully ✅");
      fetchManagers(search); // refresh list with current search
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete manager ❌");
    }
  };

  // ✅ Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    fetchManagers(search);
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manager Management</h2>
        <Link
          to="/managers/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Manager
        </Link>
      </div>

      {/* 🔍 Search */}
      <form
        onSubmit={handleSearch}
        className="flex justify-between gap-1 items-center mb-4"
      >
        <label className="text-sm font-medium mr-2">Search:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Manager name"
          className="border border-gray-400 px-3 py-1 rounded w-64 mr-auto"
        />
        {/* <button
          type="submit"
          className=" ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="hidden md:block">Search</span>
        </button> */}
      </form>

      {/* 📋 Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Serial No.</th>
              <th className="px-4 py-2 border">Manager Name</th>
              <th className="px-4 py-2 border">Email Address</th>
              <th className="px-4 py-2 border">Contact No.</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.length > 0 ? (
              data.data.map((cust, idx) => (
                <tr
                  key={cust._id}
                  className="odd:bg-white even:bg-yellow-50"
                >
                  <td className="px-4 py-2 border">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2 border">{cust.name}</td>
                  <td className="px-4 py-2 border">{cust.email}</td>
                  <td className="px-4 py-2 border">{cust.contact}</td>
                  <td className="px-4 py-2 border">{cust.address}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/managers/view-edit/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaEye size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(cust._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-4"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
