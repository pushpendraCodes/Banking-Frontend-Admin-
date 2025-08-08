import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const CareerList = () => {
  const notifications = [
    {
      id: "unique_id",
      title: "Recruitment Notice - Teacher",
      description: "Applications invited for PGT & TGT posts.",
      link: "https://example.com/pdf",
    },
  ];

  const onDelete = (id) => {
    // Add delete logic here
    console.log("Delete:", id);
  };

  return (
    <div className=" sm:p-6 lg:p-8">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">
          Official Notification / Recruitment
        </h2>
        <Link
          to="/settings/add-career"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded text-sm sm:text-base"
        >
          Add Recruitment / Notification
        </Link>
      </div>

      {/* Notification Grid */}
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white border rounded-lg shadow-sm p-4 relative hover:shadow-md transition"
            >
              {/* Delete Button */}
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => onDelete(notification.id)}
                aria-label="Delete notification"
              >
                <FaTrashAlt />
              </button>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2 break-words">
                {notification.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-2">
                {notification.description}
              </p>

              {/* View Link */}
              {notification.link && (
                <a
                  href={notification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:underline text-sm"
                >
                  View Notification
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerList;
