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
      const res = await axios.get(apiManagerUrl);
      setManagers(res.data.data || []);
    } catch (err) { console.error(err); }
  };
  const fetchAgents = async () => {
    try {
      const res = await axios.get(apiAgentUrl);
      setAgents(res.data.data || []);
    } catch (err) { console.error(err); }
  };
  const fetchAreaManagers = async () => {
    try {
       const res = await axios.get(`${import.meta.env.VITE_API_URL}areaManager`);
      setAreaManagers(res.data.data || []);
    } catch (err) { console.error(err); }
  };

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
    } catch { alert("Failed to delete customer ❌"); }
  };

  if (loading) return <p className="text-center text-gray-500">Loading customers...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold">Customer Management</h2>
        <Link to="/customers/add" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm">
          Add Customer
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input type="text" placeholder="Search By Name or Contact" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64" />

        <select value={selectedManager} onChange={e => { setSelectedManager(e.target.value); setPage(1); }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64">
          <option value="">All Managers</option>
          {managers.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
        </select>

        <select value={selectedAreaManager} onChange={e => { setSelectedAreaManager(e.target.value); setPage(1); }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64">
          <option value="">All Area Managers</option>
          {areaManagers.map(am => <option key={am._id} value={am._id}>{am.name}</option>)}
        </select>

        <select value={selectedAgent} onChange={e => { setSelectedAgent(e.target.value); setPage(1); }}
          className="border border-gray-400 px-3 py-1 rounded w-full sm:w-64">
          <option value="">All Agents</option>
          {agents.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
        </select>

        <button onClick={() => setShowSortModal(true)}
          className="sm:ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100">
          Sort By
        </button>
      </div>

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
                <td className="px-4 py-2 border"><a href={`tel:${cust.contact?.replace(/\s/g,"")}`} className="text-blue-600 hover:underline">{cust.contact}</a></td>
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
        <button disabled={page===1} onClick={()=>setPage(prev=>Math.max(prev-1,1))} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
        <button disabled={page===pagination.totalPages} onClick={()=>setPage(prev=>prev+1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>

      {/* Page size */}
      <div className="mt-3">
        <label className="mr-2">Rows per page:</label>
        <select value={limit} onChange={e=>{setLimit(Number(e.target.value)); setPage(1)}} className="border rounded px-2 py-1">
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Modals */}
      <DeletePopup show={showDeleteModal} onClose={()=>setShowDeleteModal(false)} onDelete={handleDelete} />
      <ShortPopup show={showSortModal} onClose={()=>setShowSortModal(false)} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
    </div>
  );
}
