import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiAgentUrl } from "../../api/apiRoutes";

export default function AgentList() {
  const [data, setData] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // ✅ search state

  // 🔹 Fetch Data Function
  const fetchData = async (query = "") => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiAgentUrl}${query ? `?search=${query}` : ""}`
      );

      //  response में data array "data" key के अंदर है
      if (response.data?.data) {
        setData(response.data.data);
      } else {
        setData(response.data);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Initial Load
  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    try {
      await axios.delete(`${apiAgentUrl}/${id}`);
      alert("Agent deleted successfully ✅");

      // UI से हटाने के लिए state अपडेट
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete agent ❌");
    }
  };

  // 🔹 Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      fetchData(); // search खाली है तो पूरी list load करो
    } else {
      fetchData(search); // API call with search query
    }
  };

  // 🔹 UI States
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
    <div className="">
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

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex justify-between gap-1 items-center mb-4"
      >
        <label className="text-sm font-medium mr-2">Search:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Agent name"
          className="border border-gray-400 px-3 py-1 rounded w-64"
        />
        <button
          type="submit"
          className="ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100"
        >
          <span className="hidden md:block">Search</span>
        </button>
      </form>

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
            {Array.isArray(data) && data.length > 0 ? (
              data.map((cust, idx) => (
                <tr key={cust._id} className="odd:bg-white even:bg-yellow-50">
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
                        to={`/agent/View-Edit/${cust._id}`}
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
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No agents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
