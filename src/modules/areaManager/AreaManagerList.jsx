import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaEye, FaPen, FaTrash, FaChevronDown, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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

  // Manager dropdown functionality
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");

  // Manager dropdown search functionality
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [managerSearch, setManagerSearch] = useState("");
  const [selectedManagerObj, setSelectedManagerObj] = useState(null);
  const [isManagerDropdownOpen, setIsManagerDropdownOpen] = useState(false);
  const managerDropdownRef = useRef(null);
 const navigate = useNavigate()
  const token = localStorage.getItem("token");

  // Fetch Managers for dropdown
  const fetchManagersList = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}manager?all=true`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const managerData = res.data?.data || [];
      setManagers(managerData);
      setFilteredManagers(managerData);
    } catch (err) {
      console.error("Error fetching managers:", err);
    }
  };

  // Handle manager search
  const handleManagerSearch = (searchTerm) => {
    setManagerSearch(searchTerm);
    const filtered = managers.filter(manager =>
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (manager.email && manager.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredManagers(filtered);
  };

  // Handle manager selection
  const handleManagerSelect = (manager) => {
    setSelectedManagerObj(manager);
    setSelectedManager(manager._id);
    setManagerSearch(manager.name);
    setIsManagerDropdownOpen(false);
    setPage(1);
  };

  // Clear manager selection
  const clearManagerSelection = () => {
    setSelectedManagerObj(null);
    setSelectedManager("");
    setManagerSearch("");
    setFilteredManagers(managers);
    setPage(1);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (managerDropdownRef.current && !managerDropdownRef.current.contains(event.target)) {
        setIsManagerDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch Area Managers with filters
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
    fetchManagersList();
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
    <div className="p-4">
      <div className="flex justify-between rounded-md bg-gradient-to-br from-orange-500 via-red-500 to-red-600 items-center mb-4 p-3">
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-yellow-500 p-2 rounded-full border transition-colors"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-xl font-semibold">Area Manager</h2>
        </div>
        <Link
          to="/area-manager/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >

          Add Area Manager
        </Link>
      </div>

      {/* Filters */}
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

        {/* Searchable Manager Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Filter by Manager:</label>
          <div className="relative" ref={managerDropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={managerSearch}
                onChange={(e) => {
                  handleManagerSearch(e.target.value);
                  setIsManagerDropdownOpen(true);
                }}
                onFocus={() => setIsManagerDropdownOpen(true)}
                placeholder="Search Manager..."
                className="border border-gray-400 px-3 py-2 pr-8 rounded w-64 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaChevronDown
                  className={`text-gray-400 transition-transform duration-200 ${isManagerDropdownOpen ? 'rotate-180' : ''
                    }`}
                  size={12}
                />
              </div>
            </div>

            {isManagerDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                <div
                  onClick={clearManagerSelection}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 text-gray-600"
                >
                  <span className="font-medium">All Managers</span>
                </div>

                {filteredManagers.length > 0 ? (
                  filteredManagers.map((manager) => (
                    <div
                      key={manager._id}
                      onClick={() => handleManagerSelect(manager)}
                      className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${selectedManagerObj?._id === manager._id ? 'bg-blue-100' : ''
                        }`}
                    >
                      <div className="font-medium">{manager.name}</div>
                      {manager.email && (
                        <div className="text-sm text-gray-600">{manager.email}</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">
                    No managers found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear Filter */}
      {selectedManagerObj && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={clearManagerSelection}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
          >
            Clear Manager Filter
          </button>
        </div>
      )}

      {/* Table */}
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

      {/* Pagination */}
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

      {/* Delete Popup */}
      <DeletePopup
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}