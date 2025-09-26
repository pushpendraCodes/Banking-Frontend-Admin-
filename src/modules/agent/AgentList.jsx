import axios from "axios";
import { useEffect, useState } from "react";
import { FaBan, FaEye, FaPen, FaTrash, FaUnlock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiAgentUrl } from "../../api/apiRoutes";
import DeletePopup from "../../component/DeletePopup";

export default function AgentList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // filters + pagination
  const [search, setSearch] = useState("");
  const [managerId, setManagerId] = useState("");
  const [areaManagerId, setAreaManagerId] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const token = localStorage.getItem("token")

  // fetch agents
  const fetchData = async () => {
    setLoading(true);
    try {
     const response = await axios.get(apiAgentUrl, {
  params: { search, page, limit, managerId, areaManagerId },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


      if (response.data?.data) {
        setData(response.data.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
        setTotalItems(response.data.pagination?.totalItems || 0);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  // fetch managers + area managers
  const [managers, setManagers] = useState([]);
  const [areaManagers, setAreaManagers] = useState([]);

  const fetchManagers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}manager`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setManagers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  const fetchAreaManagers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}areaManager`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAreaManagers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching area managers:", error);
    }
  };

  useEffect(() => {
    fetchManagers();
    fetchAreaManagers();
  }, []);

  useEffect(() => {
    fetchData();
  }, [search, page, managerId, areaManagerId]);

  // delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiAgentUrl}/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Agent deleted successfully ✅");

      setData((prev) => prev.filter((item) => item._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete agent ❌");
    }
  };

  const handelBlock = async (agentId) => {
    try {
      const confirmBlock = window.confirm("Are you sure you want to block this agent?");
      if (!confirmBlock) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}manager/agent/block/${agentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      if (res.data.success) {
        fetchData();
        alert("Agent blocked successfully");
      } else {
        alert(res.data.message || "Failed to block agent");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while blocking agent");
    }
  };

  const handelUnBlock = async (agentId) => {
    try {
      const confirmUnblock = window.confirm("Are you sure you want to unblock this agent?");
      if (!confirmUnblock) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}manager/agent/unblock/${agentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      if (res.data.success) {
        fetchData();
        alert("Agent unblocked successfully");
      } else {
        alert(res.data.message || "Failed to unblock agent");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while unblocking agent");
    }
  };

  if (error) {
    return <p className="text-center text-red-500">Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Agent Management</h2>
        <Link
          to="/agent/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Agent
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search agent (name/contact)"
          className="border border-gray-400 px-3 py-1 rounded w-64"
        />

        {/* Manager filter */}
        <select
          value={managerId}
          onChange={(e) => {
            setManagerId(e.target.value);
            setPage(1);
          }}
          className="border border-gray-400 px-3 py-1 rounded"
        >
          <option value="">All Managers</option>
          {managers.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Area Manager filter */}
        <select
          value={areaManagerId}
          onChange={(e) => {
            setAreaManagerId(e.target.value);
            setPage(1);
          }}
          className="border border-gray-400 px-3 py-1 rounded"
        >
          <option value="">All Area Managers</option>
          {areaManagers.map((am) => (
            <option key={am._id} value={am._id}>
              {am.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Sr.</th>
              <th className="px-4 py-2 border">Agent Name</th>
              <th className="px-4 py-2 border">Email Address</th>
              <th className="px-4 py-2 border">Contact No.</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((cust, idx) => (
                <tr key={cust._id} className="odd:bg-white even:bg-yellow-50">
                  <td className="px-4 py-2 border">{(page - 1) * limit + idx + 1}</td>
                  <td className="px-4 py-2 border">{cust.name}</td>
                  <td className="px-4 py-2 border">{cust.email}</td>
                  <td className="px-4 py-2 border">{cust.contact}</td>
                  <td className="px-4 py-2 border">{cust.address}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        to={`/agent/view/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaEye size={14} />
                      </Link>
                      <Link
                        to={`/agent/View-Edit/${cust._id}`}
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

                      {cust.isActive ? (
                        <button
                          onClick={() => handelBlock(cust._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          title="Block Agent"
                        >
                          <FaBan size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handelUnBlock(cust._id)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                          title="Unblock Agent"
                        >
                          <FaUnlock size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No agents found
                </td>
              </tr>
            )}
            {loading && <p className="text-center text-gray-500">Loading data...</p>}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`px-3 py-1 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages} ({totalItems} agents)
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`px-3 py-1 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          Next
        </button>
      </div>

      {/* Delete Popup */}
      <DeletePopup
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
        user="Agent"
      />
    </div>
  );
}
