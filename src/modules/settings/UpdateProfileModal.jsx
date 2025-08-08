import React, { useState } from 'react';

const UpdateProfileModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
