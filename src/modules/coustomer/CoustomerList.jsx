import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaEye, FaTrash, FaPen, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiCustomerUrl, apiManagerUrl, apiAgentUrl } from "../../api/apiRoutes";
import ShortPopup from "../../component/ShortPopup";
import DeletePopup from "../../component/DeletePopup";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [areaManagers, setAreaManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & search
  const [search, setSearch] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedAreaManager, setSelectedAreaManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Manager dropdown search functionality
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [managerSearch, setManagerSearch] = useState("");
  const [selectedManagerObj, setSelectedManagerObj] = useState(null);
  const [isManagerDropdownOpen, setIsManagerDropdownOpen] = useState(false);
  const managerDropdownRef = useRef(null);

  // Agent dropdown search functionality
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [agentSearch, setAgentSearch] = useState("");
  const [selectedAgentObj, setSelectedAgentObj] = useState(null);
  const [isAgentDropdownOpen, setIsAgentDropdownOpen] = useState(false);
  const agentDropdownRef = useRef(null);

  // Area Manager dropdown search functionality
  const [filteredAreaManagers, setFilteredAreaManagers] = useState([]);
  const [areaManagerSearch, setAreaManagerSearch] = useState("");
  const [selectedAreaManagerObj, setSelectedAreaManagerObj] = useState(null);
  const [isAreaManagerDropdownOpen, setIsAreaManagerDropdownOpen] = useState(false);
  const areaManagerDropdownRef = useRef(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({ totalItems: 0, totalPages: 1, currentPage: 1 });

  // Modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch Managers, Agents, Area Managers
  const fetchManagers = async () => {
    try {
      const res = await axios.get(`${apiManagerUrl}?all=true`, { headers: { Authorization: `Bearer ${token}` } });
      const managerData = res.data.data || [];
      setManagers(managerData);
      setFilteredManagers(managerData);
    } catch (err) { 
      console.error(err); 
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get(`${apiAgentUrl}?all=true`, { headers: { Authorization: `Bearer ${token}` } });
      const agentData = res.data.data || [];
      setAgents(agentData);
      setFilteredAgents(agentData);
    } catch (err) { 
      console.error(err); 
    }
  };

  const fetchAreaManagers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}areaManager?all=true`, { headers: { Authorization: `Bearer ${token}` } });
      const areaManagerData = res.data.data || [];
      setAreaManagers(areaManagerData);
      setFilteredAreaManagers(areaManagerData);
    } catch (err) { 
      console.error(err); 
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

  // Handle agent search
  const handleAgentSearch = (searchTerm) => {
    setAgentSearch(searchTerm);
    const filtered = agents.filter(agent =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.email && agent.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredAgents(filtered);
  };

  // Handle agent selection
  const handleAgentSelect = (agent) => {
    setSelectedAgentObj(agent);
    setSelectedAgent(agent._id);
    setAgentSearch(agent.name);
    setIsAgentDropdownOpen(false);
    setPage(1);
  };

  // Clear agent selection
  const clearAgentSelection = () => {
    setSelectedAgentObj(null);
    setSelectedAgent("");
    setAgentSearch("");
    setFilteredAgents(agents);
    setPage(1);
  };

  // Handle area manager search
  const handleAreaManagerSearch = (searchTerm) => {
    setAreaManagerSearch(searchTerm);
    const filtered = areaManagers.filter(manager =>
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (manager.email && manager.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredAreaManagers(filtered);
  };

  // Handle area manager selection
  const handleAreaManagerSelect = (manager) => {
    setSelectedAreaManagerObj(manager);
    setSelectedAreaManager(manager._id);
    setAreaManagerSearch(manager.name);
    setIsAreaManagerDropdownOpen(false);
    setPage(1);
  };

  // Clear area manager selection
  const clearAreaManagerSelection = () => {
    setSelectedAreaManagerObj(null);
    setSelectedAreaManager("");
    setAreaManagerSearch("");
    setFilteredAreaManagers(areaManagers);
    setPage(1);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (managerDropdownRef.current && !managerDropdownRef.current.contains(event.target)) {
        setIsManagerDropdownOpen(false);
      }
      if (agentDropdownRef.current && !agentDropdownRef.current.contains(event.target)) {
        setIsAgentDropdownOpen(false);
      }
      if (areaManagerDropdownRef.current && !areaManagerDropdownRef.current.contains(event.target)) {
        setIsAreaManagerDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch Customers
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      let url = `${apiCustomerUrl}?page=${page}&limit=${limit}`;
      const params = [];

      if (search.trim()) params.push(`search=${encodeURIComponent(search.trim())}`);
      if (selectedManager) params.push(`managerId=${selectedManager}`);
      if (selectedAgent) params.push(`agentId=${selectedAgent}`);
      if (selectedAreaManager) params.push(`areaManagerId=${selectedAreaManager}`);
      if (startDate) params.push(`fromDate=${startDate}`);
      if (endDate) params.push(`toDate=${endDate}`);

      if (params.length) url += `&${params.join("&")}`;

      const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setCustomers(res.data.data || []);
      setPagination(res.data.pagination || { totalItems: 0, totalPages: 1, currentPage: 1 });
    } catch (err) {
      setError(err.message || "Error fetching customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchManagers(); fetchAgents(); fetchAreaManagers(); fetchCustomers(); }, []);
  useEffect(() => {
    const delay = setTimeout(() => fetchCustomers(), 500);
    return () => clearTimeout(delay);
  }, [search, selectedManager, selectedAgent, selectedAreaManager, startDate, endDate, page, limit]);

  const confirmDelete = (id) => { setDeleteId(id); setShowDeleteModal(true); };
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiCustomerUrl}/${deleteId}`, { headers: { Authorization: `Bearer ${token}` } });
      setCustomers(prev => prev.filter(c => c._id !== deleteId));
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch { 
      alert("Failed to delete customer ❌"); 
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading customers...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className=" p-4">
      {/* Header */}
      <div className="flex flex-col p-2 rounded-md sm:flex-row justify-between items-start sm:items-center bg-[#dc5212] mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold">Customer Management</h2>
        <Link to="/customers/add" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm">
          Add Customer
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Search By Name or Contact" 
          value={search} 
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64" 
        />

        {/* Searchable Manager Dropdown */}
        <div className="relative w-full sm:w-64" ref={managerDropdownRef}>
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
              className="border border-gray-400 px-3 py-2 pr-8 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown 
                className={`text-gray-400 transition-transform duration-200 ${
                  isManagerDropdownOpen ? 'rotate-180' : ''
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
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                      selectedManagerObj?._id === manager._id ? 'bg-blue-100' : ''
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

        {/* Searchable Area Manager Dropdown */}
        <div className="relative w-full sm:w-64" ref={areaManagerDropdownRef}>
          <div className="relative">
            <input
              type="text"
              value={areaManagerSearch}
              onChange={(e) => {
                handleAreaManagerSearch(e.target.value);
                setIsAreaManagerDropdownOpen(true);
              }}
              onFocus={() => setIsAreaManagerDropdownOpen(true)}
              placeholder="Search Area Manager..."
              className="border border-gray-400 px-3 py-2 pr-8 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown 
                className={`text-gray-400 transition-transform duration-200 ${
                  isAreaManagerDropdownOpen ? 'rotate-180' : ''
                }`} 
                size={12} 
              />
            </div>
          </div>

          {isAreaManagerDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              <div
                onClick={clearAreaManagerSelection}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 text-gray-600"
              >
                <span className="font-medium">All Area Managers</span>
              </div>
              
              {filteredAreaManagers.length > 0 ? (
                filteredAreaManagers.map((manager) => (
                  <div
                    key={manager._id}
                    onClick={() => handleAreaManagerSelect(manager)}
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                      selectedAreaManagerObj?._id === manager._id ? 'bg-blue-100' : ''
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
                  No area managers found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Searchable Agent Dropdown */}
        <div className="relative w-full sm:w-64" ref={agentDropdownRef}>
          <div className="relative">
            <input
              type="text"
              value={agentSearch}
              onChange={(e) => {
                handleAgentSearch(e.target.value);
                setIsAgentDropdownOpen(true);
              }}
              onFocus={() => setIsAgentDropdownOpen(true)}
              placeholder="Search Agent..."
              className="border border-gray-400 px-3 py-2 pr-8 rounded w-full focus:outline-none focus:border-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FaChevronDown 
                className={`text-gray-400 transition-transform duration-200 ${
                  isAgentDropdownOpen ? 'rotate-180' : ''
                }`} 
                size={12} 
              />
            </div>
          </div>

          {isAgentDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              <div
                onClick={clearAgentSelection}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 text-gray-600"
              >
                <span className="font-medium">All Agents</span>
              </div>
              
              {filteredAgents.length > 0 ? (
                filteredAgents.map((agent) => (
                  <div
                    key={agent._id}
                    onClick={() => handleAgentSelect(agent)}
                    className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                      selectedAgentObj?._id === agent._id ? 'bg-blue-100' : ''
                    }`}
                  >
                    <div className="font-medium">{agent.name}</div>
                    {agent.email && (
                      <div className="text-sm text-gray-600">{agent.email}</div>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  No agents found
                </div>
              )}
            </div>
          )}
        </div>

        <button 
          onClick={() => setShowSortModal(true)}
          className="sm:ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100">
          Sort By
        </button>
      </div>

      {/* Clear Filters */}
      {(selectedManagerObj || selectedAreaManagerObj || selectedAgentObj) && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {selectedManagerObj && (
            <button
              onClick={clearManagerSelection}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Clear Manager
            </button>
          )}
          {selectedAreaManagerObj && (
            <button
              onClick={clearAreaManagerSelection}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Clear Area Manager
            </button>
          )}
          {selectedAgentObj && (
            <button
              onClick={clearAgentSelection}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm"
            >
              Clear Agent
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length ? customers.map((cust, idx) => (
              <tr key={cust._id} className="odd:bg-white even:bg-yellow-50">
                <td className="px-4 py-2 border">{(page - 1) * limit + idx + 1}</td>
                <td className="px-4 py-2 border">{cust.name}</td>
                <td className="px-4 py-2 border"><a href={`mailto:${cust.email}`} className="text-blue-600 hover:underline">{cust.email}</a></td>
                <td className="px-4 py-2 border"><a href={`tel:${cust.contact?.replace(/\s/g, "")}`} className="text-blue-600 hover:underline">{cust.contact}</a></td>
                <td className="px-4 py-2 border">{cust.address}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <Link to={`/customers/view/${cust._id}`} className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"><FaEye size={14} /></Link>
                  <Link to={`/customers/edit/${cust._id}`} className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"><FaPen size={14} /></Link>
                  <button onClick={() => confirmDelete(cust._id)} className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"><FaTrash size={14} /></button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="text-center py-4 text-gray-500">No customers found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button disabled={page === 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        <button disabled={page === pagination.totalPages} onClick={() => setPage(prev => prev + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>

      {/* Page size */}
      <div className="mt-3">
        <label className="mr-2">Rows per page:</label>
        <select value={limit} onChange={e => { setLimit(Number(e.target.value)); setPage(1) }} className="border rounded px-2 py-1">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Modals */}
      <DeletePopup show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} />
      <ShortPopup show={showSortModal} onClose={() => setShowSortModal(false)} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
    </div>
  );
}