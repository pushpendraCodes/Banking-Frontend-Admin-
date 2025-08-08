import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const applications = [
  {
    id: 1,
    title: "Home Loan Application Form",
    image: "/path/to/home-loan.jpg", // Replace with actual image
  },
  {
    id: 2,
    title: "Gold Loan Application Form",
    image: "/path/to/gold-loan.jpg",
  },
];

export default function ApplicationsList() {
  return (
    <div className=" bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-yellow-50 p-4 rounded-md shadow-sm gap-3">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <FaArrowLeft />
          <span>Loan Application</span>
        </div>
        <Link
          to="/settings/forms/add/loan"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded w-full sm:w-auto text-center"
        >
          Add New Application
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-[#fdf6ee] p-4 rounded-md flex flex-col items-center shadow hover:shadow-md transition"
          >
            <img
              src={app.image}
              alt={app.title}
              className="w-full max-w-[200px] h-auto object-cover rounded mb-3"
            />
            <p className="text-center font-medium mb-2 bg-gray-100 px-2 py-1 rounded">
              {app.title}
            </p>
            <button className="bg-gray-100 px-4 py-2 rounded hover:bg-red-100">
              <FaTrash className="text-black mx-auto" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
