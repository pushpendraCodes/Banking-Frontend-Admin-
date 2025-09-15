import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function PasswordPopup({ show, onClose, onSubmit }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-[#0000007a] bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-[#fff9f1] rounded-lg shadow-lg w-[350px] p-6 text-center">
        
            {/* ✅ Top Circle with Check */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                            w-16 h-16 flex items-center justify-center rounded-full 
                            bg-yellow-400 shadow-[0_0_40px_20px_rgba(250,204,21,0.7)]">
            <FaCheck className="text-white text-3xl" />
            </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4 text-left">
            <label className="block font-medium mb-1">Create New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-200 placeholder-gray-500"
              placeholder="Enter"
              required
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block font-medium mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-200 placeholder-gray-500"
              placeholder="Enter"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded"
          >
            Create
          </button>
        </form>

        {/* Close button (optional) */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
