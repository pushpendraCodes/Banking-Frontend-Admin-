import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const customers = [
  {
    id: 1,
    image: "vite.svg",
    title: "Our Society", 
  },
  {
    id: 2,
    image: "vite.svg",
    title: "Our Employee",
  },
  {
    id: 3,
    image: "vite.svg",
    title: "Others",
  },
  
];

export default function GalleryList() {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gallery Management</h2>
        <Link to="/gallary/add" className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded">
          Add Gallery
        </Link>
      </div>



      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">Serial No.</th>
              <th className="px-4 py-2 border">Gallery Image</th>
              <th className="px-4 py-2 border">Gallery Title</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust, idx) => (
              <tr key={cust.id} className="odd:bg-white even:bg-yellow-50">
                <td className="px-4 py-2 border">{String(idx + 1).padStart(2, "0")}</td>
                <td className="px-4 py-2 border">
                   <img
                      src={cust.image||"vite.svg"}
                      alt="vite.svg"
                      className="w-32 h-16 object-cover rounded"
                    />
                </td>
                <td className="px-4 py-2 border">{cust.title}</td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <Link to="/gallary/update/1" className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
                      <FaPen size={14} />
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
