import { FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "JohnDoe@example.com",
    phone: "98765 43210",
    address: "123, Elm Street, New Delhi, India",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "98765 43211",
    address: "456, Oak Avenue, Mumbai, India",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "98765 43212",
    address: "789, Pine Road, Bangalore, India",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "98765 43213",
    address: "321, Maple Lane, Hyderabad, India",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.w@example.com",
    phone: "98765 43214",
    address: "654, Cedar Blvd, Pune, India",
  },
];

export default function CustomerList() {
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
            placeholder="Customer name"
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
            {customers.map((cust, idx) => (
              <tr key={cust.id} className="odd:bg-white even:bg-yellow-50">
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
                  <a href={`tel:${cust.phone.replace(/\s/g, '')}`} className="text-blue-600 hover:underline">
                    {cust.phone}
                  </a>
                </td>
                <td className="px-4 py-2 border">{cust.address}</td>
                <td className="px-4 py-2 border whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link
                      to={`/coustomers/View-Edit/${cust.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      title="View/Edit"
                    >
                      <FaEye size={14} />
                    </Link>
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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