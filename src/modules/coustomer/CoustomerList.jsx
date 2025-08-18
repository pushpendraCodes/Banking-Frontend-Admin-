import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiCustomerUrl } from "../../api/apiRoutes";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // 🔹 Search state

  // 🔹 Fetch Customers from API
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

  // 🔹 Search Effect (जब search बदले तो API कॉल हो)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCustomers(search.trim());
    }, 500); // 500ms delay (debounce)

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // 🔹 Delete Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      await axios.delete(`${apiCustomerUrl}/${id}`);
      alert("Customer deleted successfully ✅");
      setCustomers((prev) => prev.filter((cust) => cust._id !== id));
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

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-sm font-medium whitespace-nowrap">Search:</label>
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // 🔹 Search state update
            className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64"
          />
        </div>
        <button className="sm:ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100 whitespace-nowrap">
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
              <th className="px-4 py-2 border whitespace-nowrap">Serial No.</th>
              <th className="px-4 py-2 border whitespace-nowrap">Customer Name</th>
              <th className="px-4 py-2 border whitespace-nowrap">Email Address</th>
              <th className="px-4 py-2 border whitespace-nowrap">Contact No.</th>
              <th className="px-4 py-2 border whitespace-nowrap">Address</th>
              <th className="px-4 py-2 border whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customers) && customers.length > 0 ? (
              customers.map((cust, idx) => (
                <tr key={cust._id} className="odd:bg-white even:bg-yellow-50">
                  <td className="px-4 py-2 border whitespace-nowrap">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap">{cust.name}</td>
                  <td className="px-4 py-2 border whitespace-nowrap">
                    <a href={`mailto:${cust.email}`} className="text-blue-600 hover:underline">
                      {cust.email}
                    </a>
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap">
                    <a
                      href={`tel:${cust.contact?.replace(/\s/g, "")}`}
                      className="text-blue-600 hover:underline"
                    >
                      {cust.contact}
                    </a>
                  </td>
                  <td className="px-4 py-2 border">{cust.address}</td>
                  <td className="px-4 py-2 border whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link
                        to={`/coustomers/View-Edit/${cust._id}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                        title="View/Edit"
                      >
                        <FaEye size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(cust._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
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

      {/* Pagination (Static for now) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-2">
        <div className="whitespace-nowrap">
          Showing 1 to {customers.length} of {customers.length} Entries
        </div>
        <div className="flex gap-2">
          <button className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50 whitespace-nowrap">
            Previous
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded whitespace-nowrap">1</button>
          <button className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50 whitespace-nowrap">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
