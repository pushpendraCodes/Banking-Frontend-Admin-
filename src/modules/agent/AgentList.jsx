import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const agents = [
  {
    id: 1,
    name: "John Doe",
    email: "JohnDoe@example.com",
    phone: "98765 43210",
    address: "123, Elm Street, New Delhi, India",
  },
  {
    id: 2,
    name: "John Doe",
    email: "JohnDoe@example.com",
    phone: "98765 43210",
    address: "123, Elm Street, New Delhi, India",
  },
  {
    id: 3,
    name: "John Doe",
    email: "JohnDoe@example.com",
    phone: "98765 43210",
    address: "123, Elm Street, New Delhi, India",
  },
  {
    id: 4,
    name: "John Doe",
    email: "JohnDoe@example.com",
    phone: "98765 43210",
    address: "123, Elm Street, New Delhi, India",
  },
];

export default function AgentList() {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Agent Management</h2>
        <Link to="/agent/add" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded">
          Add Agent
        </Link>
      </div>

      <div className="flex justify-between gap-1 items-center mb-4">
        <label className="text-sm font-medium mr-2">Search:</label>
        <input
          type="text"
          placeholder="Customer name"
          className="border border-gray-400 px-3 py-1 rounded w-64"
        />
        <button className="ml-auto flex items-center gap-1 text-sm border border-yellow-400 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-100">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        <span className="hidden md:block">  Sort By</span>
        </button>
      </div>

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
            {agents.map((cust, idx) => (
              <tr key={cust.id} className="odd:bg-white even:bg-yellow-50">
                <td className="px-4 py-2 border">{String(idx + 1).padStart(2, "0")}</td>
                <td className="px-4 py-2 border">{cust.name}</td>
                <td className="px-4 py-2 border">{cust.email}</td>
                <td className="px-4 py-2 border">{cust.phone}</td>
                <td className="px-4 py-2 border">{cust.address}</td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <Link to="/agent/View-Edit/1" className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
                      <FaEye size={14} />
                    </Link>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>Showing 1 to 5 of 5 Entries</div>
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
    </div>
  );
}
