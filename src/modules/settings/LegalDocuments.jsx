import React from 'react'
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
function LegalDocuments() {
        const navigate = useNavigate();

  return (<>
   <div className="bg-[#fef7ef] flex items-center gap-2 mb-4 p-2 rounded">
                      <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
                        <FaArrowLeft />
                      </button>
                      <h2 className="text-2xl font-bold ">Legal Documents</h2>
                       <Link to="/settings/forms/legal/add"
                      className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded w-full sm:w-auto text-center ml-auto">
                      Add New Documents
                    </Link>
    </div>
    <div className=" bg-white min-h-screen">
      {/* Header */}

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className=" p-4 rounded-md flex flex-col items-center  hover:shadow-md transition"
          >
              <p className="text-center font-medium mb-2 bg-gray-100 px-2 py-1 rounded">
              {app.title}
            </p>
            <img
              src={"/vite.svg"||app.image}
              alt={app.title}
              className="w-full max-w-[200px] h-auto object-cover rounded mb-3"
            />
          
            <button className="bg-gray-100 w-50 px-9 py-2 rounded hover:bg-red-100">
              <FaTrash className="text-black mx-auto" />
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
    
  )
}

export default LegalDocuments