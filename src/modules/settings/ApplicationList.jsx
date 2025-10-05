import axios from "axios";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaTrash, FaDownload, FaFilePdf, FaFileImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function ApplicationsList() {
  const navigate = useNavigate();
  const [applications, setLoanApplication] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminId = JSON.parse(localStorage.getItem("user"))?._id;
const token = localStorage.getItem("token")
  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_URL}admin/get`);
      if (res.data) {
        setLoanApplication(res.data.data.loanApplication || []);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      alert("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}admin/loan-application/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (res.data.success) {
        alert("Application deleted successfully!");
        fetchLoans();
      } else {
        alert(res.data.error || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
    }
  };

  const renderPreview = (url) => {
    if (!url) return null;

    if (url.toLowerCase().endsWith(".pdf")) {
      return (
        <div className="w-full max-w-[200px] h-[200px] flex flex-col items-center justify-center bg-gray-100 rounded mb-3">
          <FaFilePdf className="text-red-500 text-5xl mb-2" />
          <span className="text-sm text-gray-600">PDF Document</span>
        </div>
      );
    }

    if (
      url.toLowerCase().endsWith(".jpg") ||
      url.toLowerCase().endsWith(".jpeg") ||
      url.toLowerCase().endsWith(".png") ||
      url.toLowerCase().endsWith(".gif")
    ) {
      return (
        <img
          src={url}
          alt="Application"
          className="w-full max-w-[200px] h-[200px] object-cover rounded mb-3"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 text-center">Unsupported file: {url}</p>
    );
  };

  return (
    <>
      <div className="bg-[#dc5212] flex items-center gap-2 mb-4 p-2 m-2 rounded">
        <button
          onClick={() => navigate(-1)}
          className="text-black p-1 border-2 rounded-4xl"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-2xl font-bold ">Loan Application</h2>
        <Link
          to="/settings/forms/add/loan"
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-2 rounded w-full sm:w-auto text-center ml-auto"
        >
          Add New Application
        </Link>
      </div>

      <div className="bg-white min-h-screen">
        {loading ? (
          <p className="text-center p-6">Loading...</p>
        ) : applications.length === 0 ? (
          <p className="text-center p-6">No applications found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {applications.map((app, index) => (
              <div
                key={index}
                className="p-4 rounded-md flex flex-col items-center hover:shadow-md transition"
              >
                <p className="text-center font-medium mb-2 bg-gray-100 px-2 py-1 rounded">
                  {app.title}
                </p>

                {renderPreview(app.docs)}

                <div className="flex gap-3 mt-2">
                  {/* Download Button */}
                  <a
                    href={app.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="bg-gray-100 p-2 rounded hover:bg-blue-100"
                  >
                    <FaDownload className="text-blue-600" />
                  </a>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="bg-gray-100 p-2 rounded hover:bg-red-100"
                  >
                    <FaTrash className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
