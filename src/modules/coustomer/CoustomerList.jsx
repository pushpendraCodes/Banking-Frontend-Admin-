import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiCustomerUrl } from "../../api/apiRoutes";
import ShortPopup from "../../component/ShortPopup";
import DeletePopup from "../../component/DeletePopup";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedManager, setSelectedManager] = useState("All");
  const [selectedAgent, setSelectedAgent] = useState("All");

  // 🔹 Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);

  // Dummy dropdown data
  const managers = ["All", "Theresa Webb", "Wade Warren", "Robert Fox"];
  const agents = ["All", "Courtney Henry", "Guy Hawkins", "Brooklyn Simmons"];

  // 🔹 Fetch Customers
  const fetchCustomers = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `${apiCustomerUrl}?name=${query}`
        : `${apiCustomerUrl}`;

      const res = await axios.get(url);
      setCustomers(res.data?.data || res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // 🔹 Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCustomers(search.trim());
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

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
    <div className="">
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
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm font-medium whitespace-nowrap">Select Manager:</label>
          <select
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
            className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64"
          >
            {managers.map((m, i) => (
              <option key={i} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm font-medium whitespace-nowrap">Select Agent:</label>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64"
          >
            {agents.map((a, i) => (
              <option key={i} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowSortModal(true)}
          className="sm:ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100 whitespace-nowrap"
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
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2 border">{cust.name}</td>
                  <td className="px-4 py-2 border">
                    <a href={`mailto:${cust.email}`} className="text-blue-600 hover:underline">
                      {cust.email}
                    </a>
                  </td>
                  <td className="px-4 py-2 border">
                    <a href={`tel:${cust.contact?.replace(/\s/g, "")}`} className="text-blue-600 hover:underline">
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
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>Showing 1 to {customers.length} of {customers.length} Entries</div>
        <div className="flex gap-2">
          <button className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50">
            Previous
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded">1</button>
          <button className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50">
            Next
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {/* {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a]  bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h3 className="text-lg font-semibold mb-3">Delete this Customer?</h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border border-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
       <DeletePopup 
       show={showDeleteModal} 
       onClose={() => setShowDeleteModal(false)} 
      onDelete={handleDelete}
      />

      {/* Sort Modal */}
      {/* {showSortModal && (
       
      )} */}
       <ShortPopup 
           show={showSortModal} 
             onClose={() => setShowSortModal(false)} />

    </div>
  );
}
