import { useEffect, useState } from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Banners() {
  const [banners, setBanners] = useState([]);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    // localStorage से user data और token लेना
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      // अगर array है तो पहला element लो
      if (Array.isArray(parsedUser)) {
        setBanners(parsedUser[0]?.banners || []);
        setAdminId(parsedUser[0]?._id || null); // ✅ admin id ले रहे हैं
      } else {
        setBanners(parsedUser.banners || []);
        setAdminId(parsedUser?._id || null); // ✅ admin id ले रहे हैं
      }

      console.log("User Data:", parsedUser);
      console.log("Banners:", parsedUser.banners);
    }

    const token = localStorage.getItem("token");
    console.log("Token:", token);
  }, []);

  console.log(banners, "aaa");
  console.log("Admin ID:", adminId);

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Website Banner</h2>
        <Link
          to="/banner/add"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add Banner
        </Link>
      </div>

      <div className="bg-white rounded shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border">SR. No.</th>
              <th className="px-4 py-2 border">Banner Image</th>
              <th className="px-4 py-2 border">Banner Type</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.length > 0 ? (
              banners.map((banner, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-yellow-50">
                  <td className="px-4 py-2 border">
                    {String(idx + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-2 border">
                    <img
                      src={banner.imageUrl || banner.image || "/placeholder.jpg"}
                      alt="banner"
                      className="w-32 h-16 object-cover rounded"
                    />
                  </td>
                   <td className="px-4 py-2 border">
                    {banner.type || "N/A"}
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex gap-2">
                      <Link
                        // ✅ अब adminId और bannerId दोनों URL में जाएंगे
                        to={`/banner/update/${adminId || idx}`}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      >
                        <FaPen size={14} />
                      </Link>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No Banners Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          Showing 1 to {banners.length} of {banners.length} Entries
        </div>
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
