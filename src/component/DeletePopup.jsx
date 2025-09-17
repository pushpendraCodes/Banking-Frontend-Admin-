import React from "react";

function DeletePopup({ show, onClose, onDelete ,user= "coustomer" }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-40 z-50">
      {/* Popup Container */}
      <div className="relative bg-[#fffaf4] p-6 rounded-2xl shadow-md w-96 text-center">
        
        {/* Top Right Notch */}
        <div className="absolute -top-1 right-0.5 w-9 h-9 bg-[#fffaf4] rounded-tr-2xl rotate-45"></div>

        {/* Heading */}
        <h3 className="text-2xl font-semibold mb-8">Delete this {user}</h3>

        {/* Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={onDelete}
            className="px-8 py-3 bg-yellow-400 text-white font-semibold rounded-2xl shadow hover:bg-yellow-500 transition"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-2xl hover:bg-yellow-50 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
